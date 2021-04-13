/**
 * CONTROLADOR DE INVESTIGADORES
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgreSQL");

/**
 * Validar la información del investigador
 * @param {*} investigador Json del investigador
 */
let validarInvestigador = (investigador) => {
  if (!investigador) {
    throw {
      ok: false,
      mensaje: "La información del investigador es obligatoria.",
    };
  }
  if (!investigador.researcher_document) {
    throw {
      ok: false,
      mensaje: "El documento del investigador es obligatorio.",
    };
  }
  if (!investigador.first_name) {
    throw { ok: false, mensaje: "El nombre del investigador es obligatorio." };
  }
  if (!investigador.last_name) {
    throw {
      ok: false,
      mensaje: "El apellido del investigador es obligatorio.",
    };
  }
  if (!investigador.email) {
    throw { ok: false, mensaje: "El email del investigador es obligatorio." };
  }
  if (!investigador.password) {
    throw {
      ok: false,
      mensaje: "La contraseña para el investigador es obligatoria.",
    };
  }
};

/**
 * Guardar en base de datos un investigador
 * @param {*} investigador
 */
let guardarInvestigador = async (investigador) => {
  let _servicio = new ServicioPg();
  let sql = `INSERT INTO public.researcher(
	researcher_document, first_name, last_name, email, password)
    VALUES (
    ${investigador.researcher_document}, 
    '${investigador.first_name}', 
    '${investigador.last_name}', 
    '${investigador.email}', 
    '${investigador.password}');`;

  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

/**
 * Consultar investigadores
 * @param {*} filtros
 */
let consultarInvestigadores = async () => {
  let _servicio = new ServicioPg();
  let sql = `SELECT * FROM public.researcher;`;

  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

let consultarInvestigador = async (researcher_document) => {
  let _servicio = new ServicioPG();
  let sql = `SELECT * FROM public.researcher WHERE researcher_document =${researcher_document}`;
  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

let eliminarInvestigador = async (researcher_document) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM public.researcher WHERE researcher_document=${researcher_document}`;

  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

let modificarInvestigador = async (investigador, researcher_document) => {
  if (investigador.researcher_document != researcher_document) {
    throw { ok: false, mensaje: "Documento erroneo, no encontrado" };
  } else {
    let _servicio = new ServicioPg();
    let sql = ''
    if (investigador.password == "---") {
      sql = `UPDATE public.researcher
      SET first_name= '${investigador.first_name}', 
      last_name= '${investigador.last_name}', 
      email= '${investigador.email}'
      WHERE researcher_document = ${researcher_document};`;
    } else{
      sql = `UPDATE public.researcher
      SET first_name= '${investigador.first_name}', 
      last_name= '${investigador.last_name}', 
      email= '${investigador.email}', 
      password= '${investigador.password}'
      WHERE researcher_document = ${researcher_document};`;
    }
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
  }
};

module.exports = {
  validarInvestigador,
  guardarInvestigador,
  consultarInvestigadores,
  consultarInvestigador,
  eliminarInvestigador,
  modificarInvestigador,
};
