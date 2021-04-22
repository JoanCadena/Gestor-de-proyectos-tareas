const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')
const config = require('../config')

const _controlador = require("../controllers/Registro_investigadores");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: config.MY_USER,
    pass: config.MY_PASS
  }
});

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
    var mailOptions = {
      from: config.MY_USER,
      to: `inmortal_20@live.com, ${req.body.email}`,
      subject: 'Registro Añadido',
      text: `
      Se ha añadido un nuevo registro a la DB, 
      en este caso un nuevo investigador ha sido 
      registrado. A continuación información relevante 
      del investigador en cuestión: 
      
      - Nombre: ${req.body.first_name} ${req.body.last_name} 
      - CC: ${req.body.researcher_document} 
      - Correo: ${req.body.email}
      
      Para más información, por favor responda este mensaje `
    }

    _controlador.validarInvestigador(info_investigador);

    _controlador
      .guardarInvestigador(info_investigador)
      .then((respuestaDB) => {
        transporter.sendMail(mailOptions, function(err, info){
          if (err){
            console.log(err);
          }
        })

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
