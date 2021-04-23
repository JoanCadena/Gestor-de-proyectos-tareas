/**
 * CONTROLADOR DE ESPACIOS DE TRABAJO
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgreSQL");

/**
 * Validar la información del espacioTrabajo
 * @param {*} espacioTrabajo Json del espacioTrabajo
 */
let validarEspacioTrabajo = (espacioTrabajo) => {
  if (!espacioTrabajo) {
    throw {
      ok: false,
      mensaje: "La información del Espacio de Trabajo es obligatoria.",
    };
  }
  if (!espacioTrabajo.workspace_name) {
    throw { ok: false, mensaje: "El nombre del espacio de trabajo es obligatorio." };
  }
  if (!espacioTrabajo.description) {
    throw { ok: false, mensaje: "La descripción del espacio trabajo es obligatoria.",
    };
  }
  if (!espacioTrabajo.due_date) {
    throw { ok: false, mensaje: "La fecha de creación del espacio de trabajo es obligatoria.",
    };
  }
};

/**
 * Guardar en base de datos un espacioTrabajo
 * @param {*} espacioTrabajo
 */
let guardarEspacioTrabajo = async (espacioTrabajo) => {
  let _servicio = new ServicioPg();
  let sql = `INSERT INTO public.workspace(
	workspace_name, description, due_date, date_extended)
    VALUES (
    '${espacioTrabajo.workspace_name}', 
    '${espacioTrabajo.description}', 
    '${espacioTrabajo.due_date}', 
    '${espacioTrabajo.due_date}');`;

  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

/**
 * Consultar espaciosTrabajo
 * @param {*} filtros
 */
let consultarEspaciosTrabajo = async () => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.workspace;`;

    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let eliminarEspacioTrabajo = async ({ idworkspace }) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM public.workspace WHERE  idworkspace=${idworkspace} cascade`;

  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

let modificarFecha = async (idworkspace, bodyx) => {
  if (bodyx.idworkspace != idworkspace) {
    throw { ok: false, mensaje: "Documento erroneo, no encontrado" };
  } else {
    let _servicio = new ServicioPg();
    let sql = `UPDATE public.workspace
    SET date_extended='${bodyx.date_extended}', reason_extended='${bodyx.reason_extended}'
    WHERE idworkspace = ${idworkspace};`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
  }
};

module.exports = {
  validarEspacioTrabajo,
  guardarEspacioTrabajo,
  consultarEspaciosTrabajo,
  eliminarEspacioTrabajo,
  modificarFecha
};
