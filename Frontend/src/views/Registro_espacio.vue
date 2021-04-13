<template>
  <div id="espacio_trabajo" class="home">
    <!-- <img alt="Vue logo" src="../static/logo.png"> -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <HelloWorld msg="Registro de Espacio de trabajo" />
    
    <br>
   
    <div class="container">

      <section class="form">
        <form class="was-validated">

          <div class="mb-3" v-if="!enEdicion">
              <label for="inputNombreEspacioTrabajo" class="form-label">Espacio de trabajo</label>
              <input v-model="nombreEspacio" type="text" class="form-control" id="inputNombreEspacioTrabajo" placeholder="Nombre espacio de trabajo" required> 
              <div class="invalid-feedback"> Ingrese el nombre del espacio de trabajo del proyecto </div>
          </div>

          <div class="mb-3" v-if="!enEdicion">
            <label for="inputDescripciónEspacioTrabajo" class="form-label">Descripción espacio</label>
            <textarea v-model="descripcionEspacio" class="form-control" id="inputDescripciónEspacioTrabajo" rows="3" required></textarea>
            <div class="invalid-feedback"> Ingrese una descripción basica del espacio de proyecto </div>
          </div>
          
          <div class="mb-3" v-if="!enEdicion">
            <label for="inputFechaCulminacionProyecto" class="form-label">Fecha de culminación del proyecto</label>
            <input type="date" v-model="fecha" name="Fecha"  class="form-control" id="inputFechaCulminacionProyecto" required>
            <div class="invalid-feedback"> Ingrese fecha de culminación del proyecto </div>
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

          <button type="submit" @click.prevent="crearEspacioDeTrabajo" class="btn btn-outline-success" v-if="!enEdicion">Registrar</button>
          
          <button
            type="submit"
            @click.prevent="modificarFecha"
              class="btn btn-outline-success"
              v-if="enEdicion"
          >
            Actualizar
          </button>
        </form>
      </section>

      <section class="data">
        <caption >
          Espacios
        </caption>
          <table class="table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre espacio</th>
                <th>Descripción</th>
                <th>Fecha finalización</th>
                <th>Fecha prorroga</th>
                <th>Razón prorroga</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="espacio in espaciosDeTrabajo" 
              :key="espacio.idworkspace">
                <td>{{ espacio.idworkspace }}</td>
                <td>{{ espacio.workspace_name }}</td>
                <td>{{ espacio.description }}</td>
                <td>{{ espacio.due_date }}</td>
                <td>{{ espacio.date_extended }}</td>
                <td>{{ espacio.reason_extended }}</td>
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
    idworkspace: '',
    nombreEspacio: '',
    nombreValido: true,
    descripcionEspacio: '',
    descripcionValida: true,
    fecha: '',
    fechaValida: true,
    espaciosDeTrabajo: [],
    reason_extended: '',
    date_extended: '',
    enEdicion: false

  }),
  created: function () {
    this.obtenerEspaciosDeTrabajo();
  },
  methods: {
    obtenerEspaciosDeTrabajo: function () {
      axios.get("http://localhost:3001/workspace")
        .then((result) => {
          this.espaciosDeTrabajo = result.data.info.map(x => {
            var f = Object.assign({}, x);
            f.due_date = x.due_date.slice(0, 10);
            f.date_extended = x.date_extended.slice(0, 10);
            return f;
          });
        });
    },
    crearEspacioDeTrabajo: function() {
      this.validarFormulario();
      let testPost = {
        workspace_name: this.nombreEspacio,
        description: this.descripcionEspacio,
        due_date: this.fecha
      };
      axios.post('http://localhost:3001/workspace', testPost).then((resp) => {
        if (resp.data.name == 'error') {
          this.limpiarCampos();
          alert('No se puede ingresar el workspace porque ya se encuentra registrado');
        } else if(resp.data.ok) {
          this.limpiarCampos();
          alert('Espacio de trabajo registrado');
        }
      })
      this.obtenerEspaciosDeTrabajo();
    },

    cargarDatos: function(e){
      this.enEdicion = true
      var fila = e.target.parentNode.parentNode; //Se almacena en una variable a la fila que la contiene
      
      this.idworkspace = fila.cells[0].textContent
      this.date_extended = fila.cells[4].textContent
      this.reason_extended = fila.cells[5].textContent
    },

    modificarFecha: function(){
      let testPut = {
        idworkspace: this.idworkspace,
        date_extended: this.date_extended,
        reason_extended: this.reason_extended
      };
      axios.put(`http://localhost:3001/workspace/${testPut.idworkspace}`, testPut).then((resp) => {
        if (resp.data.name == 'error') {
          alert('No se puede actualizar el workspace');
        }
        this.limpiarCampos();
        this.obtenerEspaciosDeTrabajo();
      });
      alert('Workspace Actualizado')
      this.enEdicion = false
    },

    limpiarCampos: function(){
      this.nombreEspacio = '';
      this.descripcionEspacio = '';
      this.fecha = '';
    },
    validarFormulario: function () {
      if (!this.first_name) {
        this.nombreValido = false;
      }
      if (!this.last_name) {
        this.descripcionValida = false;
      }
      if (!this.researcher_document) {
        this.fechaValida = false;
      }
    },
  }
};
</script>