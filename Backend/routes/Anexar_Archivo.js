const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/Anexar_Archivo");

/**
 * Obtener todos los archivos
 */
router.get("/archivo", (req, res) => {
    _controlador
      .consultarArchivos()
      .then((respuestaDB) => {
        let registros = respuestaDB.rows;
        res.send({
          ok: true,
          info: registros,
          mensaje: "Archivos consultados",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  });

/**
 * Actualizar (asignar) fecha a un archivo
 */
router.put("/archivo/:idworkspace/:idcompromise", (req, res) => {
    let idworkspace = req.params.idworkspace;
    let idcompromise = req.params.idcompromise;
  
    if (idworkspace && idcompromise) {
      _controlador
        .asignarFechaEnvio(idworkspace, idcompromise)
        .then((respuestaDB) => {
            res.send({ ok: true, info: {}, mensaje: "Fecha del archivo insertada (actualizada)" });
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
    }
  });

  /**
   * Actualizar un archivo con comentario de retroalimentación
   */
router.put("/archivo/comentario/:idworkspace/:idcompromise", (req, res) => {
    let idworkspace = req.params.idworkspace;
    let idcompromise = req.params.idcompromise;
    let feedback_commentary = req.body.feedback_commentary;
  
    if (idworkspace && idcompromise) {
      _controlador
        .asignarComentario(idworkspace, idcompromise, feedback_commentary)
        .then((respuestaDB) => {
          res.send({ ok: true, info: {}, mensaje: "Comentario de retroalimentación actualizado" });
        })
        .catch((error) => {
            res.send(error);
        });
    }
  }); 
  
  module.exports = router;