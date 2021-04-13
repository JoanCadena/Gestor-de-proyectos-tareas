<template>
  <div id="crear_compromiso" class="home">
    <!-- <img alt="Vue logo" src="../static/logo.png"> -->
    <HelloWorld msg="Crear compromiso para un investigador" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <br>
   
    <div class="container">
      <form class="was-validated">
        <div class="mb-3" v-if="!enEdicion">
          <label for="inputIdEspacioTrabajo" class="form-label">Espacio de trabajo</label>
          <select v-model="idEspacioDeTrabajo" class="form-select"  aria-label="selectespacio" id="selectIdEspacioTrabajo" required>
            <option value="">Seleccione un espacio de trabajo</option>
            
          </select>
          <div class="invalid-feedback">Debe Seleccionar un espacio de trabajo</div>
        </div>

        <div class="mb-3" v-if="!enEdicion">
          <label for="inputIdInvestigador" class="form-label">Nombre investigador</label>
          <select v-model="idInvestigador" class="form-select"  aria-label="selectinvestigador" id="selectIdInvestigador" required>
            <option value="">Seleccione un investigador para el compromiso</option>
            
          </select>
          <div class="invalid-feedback">Debe Seleccionar un investigador para el compromiso</div>
        </div>

        <br>
        <hr>
        <br>
        
        <div class="mb-3" v-if="!enEdicion">
          <label for="inputNombreCompromiso" class="form-label">Nombre del compromiso</label>
          <input v-model="nombreCompromiso" type="text" class="form-control" id="inputNombreCompromiso" placeholder="Nombre del compromiso" required> 
          <div class="invalid-feedback">Ingresa el nombre de un compromiso</div>
        </div>

          <div class="mb-3">
            <label for="inputDescripciónCompromiso" class="form-label">Descripción compromiso</label>
            <textarea v-model="descripcionCompromiso" type="text" class="form-control" id="inputDescripciónCompromiso" rows="3" required></textarea>
            <div class="invalid-feedback">Ingresa la descripcion detallada del compromiso</div>
          </div>

          <div class="mb-3" v-if="!enEdicion">
            <input v-model="fechaCompromiso" type="date" name="Fecha"  class="form-control" id="" required>
            <div class="invalid-feedback"> Ingrese fecha de culminación del compromiso </div>
          </div>

          <div class="mb-3" v-if="enEdicion">
            <label for="inputReason" class="form-label">Razon de prorrogra</label>
            <textarea v-model="reason_extended" class="form-control" id="inputReason" rows="3" required></textarea>
            <div class="invalid-feedback"> Explique porque extendera la fecha del proyecto </div>
          </div>
          
          <div class="mb-3" v-if="enEdicion">
            <label for="inputFechaExtended" class="form-label">Nueva fecha de culminación del proyecto</label>
            <input type="date" v-model="date_extended" name="Fecha"  class="form-control" id="inputFechaExtended" required>
            <div class="invalid-feedback"> Ingrese nueva fecha de culminación del proyecto </div>
          </div>

          <button type="submit" @click.prevent="crearCompromiso" class="btn btn-outline-success" v-if="!enEdicion">Registrar</button>

          <button
            type="submit"
            @click.prevent="modificarCompromiso"
              class="btn btn-outline-success"
              v-if="enEdicion"
          >
            Actualizar
          </button>
        </form>

      <section class="data">
        <caption >
          Compromisos
        </caption>
          <table class="table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre compromiso</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha finalización</th>
                <th>Fecha prorroga</th>
                <th>Razón prorroga</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="compromiso in compromisos" 
              :key="compromiso.idworkspace">
                <td>{{ compromiso.idcompromise }}</td>
                <td>{{ compromiso.compromise_name }}</td>
                <td>{{ compromiso.compromise_description }}</td>
                <td>{{ compromiso.status }}</td>
                <td>{{ compromiso.due_date }}</td>
                <td>{{ compromiso.date_extended }}</td>
                <td>{{ compromiso.reason_extended }}</td>
                <td>
                <button
                  size="sm"
                  @click.prevent="cargarDatos"
                  class="btn btn-outline-primary"
                  id="btn-mod"
                  >Modificar
                </button>
                </td>
              </tr>
            </tbody>
          </table>
      </section>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data: () => ({
    idcompromise: '',
    idEspacioDeTrabajo: '',
    idWorkValido: true,
    espaciosTrabajo: [],
    idInvestigador: '',
    idInvValido: true,
    investigadores: [],
    nombreCompromiso: '',
    nombreValido: true,
    descripcionCompromiso: '',
    descValida: true,
    fechaCompromiso: '',
    fechaValida: true,
    compromisos: [],
    reason_extended: '',
    date_extended: '',
    enEdicion: false
  }),
  created: function () {
    this.obtenerCompromisos();
    this.obtenerEspaciosDeTrabajo();
    this.obtenerInvestigadores();
  },
  methods: {
    obtenerCompromisos: function () {
      axios.get("http://localhost:3001/compromiso")
        .then((result) => {
          this.compromisos = result.data.info.map(x => {
            var f = Object.assign({}, x);
            f.due_date = x.due_date.slice(0, 10);
            f.date_extended = x.date_extended.slice(0, 10);
            return f;
          });
          for (let i = 0; i < this.compromisos.length; i++) {
            const aux = this.compromisos[i];
            switch (aux["status"]) {
              case 0:
                this.compromisos[i]["status"] = "No iniciado";
                break;
              case 1:
                this.compromisos[i]["status"] = "En Curso";
                break;
              case 2:
                this.compromisos[i]["status"] = "Finalizado";
                break;
              case 3:
                this.compromisos[i]["status"] = "En Curso (Retrasado)";
                break;
              default:
                break;
            }
          }
        });
    },
    stringToHTML: function(s){
      const parser = new DOMParser();
      const doc = parser.parseFromString(s, "text/html");
      return doc.body.firstChild;
    },
    obtenerEspaciosDeTrabajo: function () {
      axios.get("http://localhost:3001/workspace")
        .then((result) => {
          this.espaciosTrabajo = result.data.info
          for (let i = 0; i < this.espaciosTrabajo.length; i++) {
            var html = this.stringToHTML(`<option value=${this.espaciosTrabajo[i]['idworkspace']}>${this.espaciosTrabajo[i]['workspace_name']}</option>`);
            document.getElementById('selectIdEspacioTrabajo').appendChild(html)
          }
        });
    },
    obtenerInvestigadores: function () {
      axios
        .get("http://localhost:3001/investigador")
        .then((result) => {
          this.investigadores = result.data;
          for (let i = 0; i < this.investigadores.length; i++) {
            var html = this.stringToHTML(`<option value=${this.investigadores[i]['researcher_document']}>${this.investigadores[i]['first_name']} ${this.investigadores[i]['last_name']}</option>`);
            document.getElementById('selectIdInvestigador').appendChild(html)
          }
        });
    },
    crearCompromiso: function() {
      this.validarFormulario();
      let testPost = {
        idworkspace: this.idEspacioDeTrabajo,
        researcher_document: this.idInvestigador,
        compromise_name: this.nombreCompromiso,
        compromise_description: this.descripcionCompromiso,
        due_date: this.fechaCompromiso,
      };
      axios.post('http://localhost:3001/compromiso', testPost).then((resp) => {
        if (resp.data.name == 'error') {
          this.limpiarCampos();
          alert('No se puede ingresar el compromiso porque ya se encuentra registrado');
        } else if(resp.data.ok) {
          this.limpiarCampos();
          alert('Compromis registrado');
        }
      })
      this.obtenerCompromisos();
    },
    cargarDatos: function(e){
      this.enEdicion = true
      var fila = e.target.parentNode.parentNode; //Se almacena en una variable a la fila que la contiene
      
      this.idcompromise = fila.cells[0].textContent
      this.descripcionCompromiso = fila.cells[2].textContent
      this.date_extended = fila.cells[5].textContent
      this.reason_extended = fila.cells[6].textContent
    },
    modificarCompromiso: function(){
      let testPut = {
        idcompromise: this.idcompromise,
        compromise_description: this.descripcionCompromiso,
        date_extended: this.date_extended,
        reason_extended: this.reason_extended
      };
      axios.put(`http://localhost:3001/compromiso/${testPut.idcompromise}`, testPut).then((resp) => {
        if (resp.data.name == 'error') {
          alert('No se puede actualizar el workspace');
        }
        this.limpiarCampos();
        this.obtenerCompromisos();
      });
      alert('Compromiso Actualizado')
      this.enEdicion = false
    },
    limpiarCampos: function(){
      this.idEspacioDeTrabajo = '';
      this.idInvestigador = '';
      this.nombreCompromiso = '';
      this.descripcionCompromiso = '';
      this.fechaCompromiso = '';
    },
    validarFormulario: function () {
      if (!this.idEspacioDeTrabajo) {
        this.idWorkValido = false;
      }
      if (!this.idInvestigador) {
        this.idInvValido = false;
      }
      if (!this.nombreCompromiso) {
        this.nombreValido = false;
      }
      if (!this.descripcionCompromiso) {
        this.descValida = false;
      }
      if (!this.fechaCompromiso) {
        this.fechaValida = false;
      }
    },
  }
};
</script>