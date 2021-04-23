const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')
const config = require('../config')

const _controlador = require("../controllers/Registro_espacio");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: config.MY_USER,
    pass: config.MY_PASS
  }
});

/**
 * Obtener todas los workspace
 */
router.get("/workspace", (req, res) => {
  _controlador
    .consultarEspaciosTrabajo()
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      res.send({
        ok: true,
        info: registros,
        mensaje: "Workspaces consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda un workspace
 */
router.post("/workspace", (req, res) => {
  try {
    let info_workspace = req.body;

    var mailOptions = {
      from: config.MY_USER,
      to: `inmortal_20@live.com`,
      subject: 'Registro Añadido',
      text: `
      Se ha añadido un nuevo registro a la DB, 
      en este caso un nuevo proyecto ha sido 
      añadido. A continuación información relevante 
      del proyecto en cuestión: 
      
      - Nombre: ${req.body.workspace_name}
      - Detalles: ${req.body.description} 
      - Fecha finalización: ${req.body.due_date}
      
      Para más información, por favor responda este mensaje `
    }

    _controlador.validarEspacioTrabajo(info_workspace);
    
    _controlador
      .guardarEspacioTrabajo(info_workspace)
      .then((respuestaDB) => {
        transporter.sendMail(mailOptions, function(err, info){
          if (err){
            console.log(err);
          }
        })

        res.send({
          ok: true,
          mensaje: "Workspace guardado",
          info: info_workspace,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.put("/workspace/:idworkspace", (req, resp) => {
  let idworkspace = req.params.idworkspace;
  let bodyx = req.body;
  _controlador
    .modificarFecha(idworkspace, bodyx)
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
