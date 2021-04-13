const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/Crear_compromiso");

/**
 * Obtener todas los compromiso
 */
router.get("/compromiso", (req, res) => {
  _controlador
    .consultarCompromisos()
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      res.send({
        ok: true,
        info: registros,
        mensaje: "Compromisos consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda un compromiso
 */
router.post("/compromiso", (req, res) => {
  try {
    let info_compromiso = req.body;

    _controlador.validarCompromiso(info_compromiso);
    
    _controlador
      .guardarCompromiso(info_compromiso)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Compromiso guardado",
          info: info_compromiso,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.put("/compromiso/:idcompromise", (req, resp) => {
  let idcompromise = req.params.idcompromise;
  let bodyx = req.body;
  _controlador
    .modificarCompromiso(idcompromise, bodyx)
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