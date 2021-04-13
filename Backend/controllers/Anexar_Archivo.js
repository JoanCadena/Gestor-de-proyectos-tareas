/**
 * CONTROLADOR DE ARCHIVOS
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgreSQL");

/**
 * Validar la información del archivo
 * No se encuentra en uso debido a que aún no se realiza el insert
 * @param {*} archivo Json del archivo
 */
let validarArchivo = (archivo) => {
  if (!archivo) {
    throw {
      ok: false,
      mensaje: "La información del archivo es obligatoria.",
    };
  }
  if (!archivo.idcompromise) {
    throw { ok: false, mensaje: "Es obligatorio seleccionar un compromiso." };
  }
  if (!archivo.idworkspace) {
    throw { ok: false, mensaje: "El codigo del espacio de trabajo es obligatorio.",
    };
  }
  if (!archivo.researcher_document) {
    throw { ok: false, mensaje: "El documento del investigador es obligatorio.",
    };
  }
};

/**
 * Consultar archivos
 * @param {} 
 */
 let consultarArchivos = async () => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.compromise_workspace;`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};


/**
 * Método PUT para asignar fecha ACTUAL a un archivo enviado
 * @param {*} idworkspace 
 * @param {*} idcompromise 
 */
let asignarFechaEnvio = async(idworkspace, idcompromise) => {
    let _servicio = new ServicioPg();
    let sql = 
    `UPDATE public.compromise_workspace 
    SET send_date = current_date
    WHERE idworkspace = ${idworkspace}
    and idcompromise = ${idcompromise};`;
  
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
  };

/**
 * Método PUT para asignar un comentario a un archivo ENVIADO
 * @param {*} idworkspace 
 * @param {*} idcompromise 
 * @param {*} feedback_commentary 
 */
  let asignarComentario = async(idworkspace, idcompromise, feedback_commentary) => {
    let _servicio = new ServicioPg();
    let sql = 
    `UPDATE public.compromise_workspace 
    SET feedback_commentary = '${feedback_commentary}'
    WHERE idworkspace = ${idworkspace}
    and idcompromise = ${idcompromise};`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
  };

module.exports = {
    validarArchivo,
    consultarArchivos,
    asignarFechaEnvio,
    asignarComentario
}