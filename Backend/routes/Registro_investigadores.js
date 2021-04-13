const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/Registro_investigadores");

/**
 * Obtener todas los investigador
 */
router.get("/investigador", (req, res) => {
  _controlador
    .consultarInvestigadores()
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      res.send(registros);
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda un investigador
 */
router.post("/investigador", (req, res) => {
  try {
    let info_investigador = req.body;

    _controlador.validarInvestigador(info_investigador);

    _controlador
      .guardarInvestigador(info_investigador)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Investigador guardado",
          info: info_investigador,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

/**
 * Eliminar un investigador
 */
router.delete("/investigador/:researcher_document", (req, res) => {
  let researcher_document = req.params.researcher_document;
  if (researcher_document) {
    _controlador
      .eliminarInvestigador(researcher_document)
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "Investigador eliminado" });
      })
      .catch((error) => {
        res.send(error);
      });
  }
});

/**
 * Actualizar un investigador
 */
router.put("/investigador/:researcher_document", (req, resp) => {
  let researcher_document = req.params.researcher_document;
  let investigador = req.body;
  _controlador
    .modificarInvestigador(investigador, researcher_document)
    .then((respuestaDB) => {
      resp.send({
        ok: true,
        mensaje: "Modificado exitosamente ",
        info: respuestaDB,
      });
    })
    .catch((error) => {
      resp.send({ ok: false, mensaje: "Error al modificar ", info: error });
    });
});

module.exports = router;
