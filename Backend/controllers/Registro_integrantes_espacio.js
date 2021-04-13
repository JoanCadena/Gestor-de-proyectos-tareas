/**
 * CONTROLADOR DE INTEGRANTES
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgreSQL");

/**
 * Validar la información del integrante
 * @param {*} integrante Json del integrante
 */
let validarIntegrante = (integrante) => {
  if (!integrante) {
    throw {
      ok: false,
      mensaje: "La información del integrante es obligatoria.",
    };
  }
  if (!integrante.researcher_document) {
    throw { ok: false, mensaje: "El documento del integrante es obligatorio." };
  }
  if (!integrante.idworkspace) {
    throw { ok: false, mensaje: "El codigo del espacio de trabajo es obligatorio.",
    };
  }
};

/**
 * Guardar en base de datos un integrante
 * @param {*} integrante
 */
let guardarIntegrante = async (integrante) => {
  let _servicio = new ServicioPg();
  let sql = `INSERT INTO public.researcher_workspace(
	researcher_document, idworkspace)
    VALUES (
    ${integrante.researcher_document}, 
    '${integrante.idworkspace}');`;
    
  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

/**
 * Consultar Integrantes
 * @param {*} filtros
 */
let consultarIntegrantes = async () => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.researcher_workspace;`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let eliminarIntegrante = async ({ idresearcher_workspace }) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM public.researcher_workspace WHERE  idresearcher_workspace=${idresearcher_workspace} cascade`;

  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

/**
 * Validar la información del rol
 * @param {*} rol Json del rol
 */
 let validarRol = (rol) => {
  if (!rol) {
    throw {
      ok: false,
      mensaje: "La información del rol es obligatoria.",
    };
  }
  if (!rol.idresearcher_workspace) {
      throw {
          ok: false,
          mensaje: "El código del espacio de trabajo es obligatorio." };
    }
  if (!rol.researcher_document) {
  throw {
      ok: false,
      mensaje: "El documento del investigador es obligatorio." };
  }
  if (!rol.idrol) {
      throw {
          ok: false,
          mensaje: "El código del rol es obligatorio." };
      }  
};
/**
* Método PUT para guardar en la base de datos un rol asignado a un investigador
* @param {*} rol
*/

let asignarRol = async(idrole, researcher_document, idworkspace) => {
  let _servicio = new ServicioPg();
  let sql = 
  `UPDATE public.researcher_workspace 
  SET idrole = ${idrole}
  WHERE researcher_document = ${researcher_document}
  and idworkspace = ${idworkspace};`;

  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

module.exports = {
  validarIntegrante,
  guardarIntegrante,
  consultarIntegrantes,
  eliminarIntegrante,
  validarRol,
  asignarRol
};
