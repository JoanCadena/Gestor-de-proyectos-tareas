<template>
  <div id="investigadores" class="home">
    <!-- <img alt="Vue logo" src="../static/logo.png"> -->
    <HelloWorld msg="Registro de Investigadores" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    
    <br />
    <div class="container">
      <section class="form">
        <form class="was-validated">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputNombreInvestigador">Nombre</label>
              <input
                v-model="first_name"
                type="text"
                class="form-control"
                id="inputNombreInvestigador"
                placeholder="Nombre"
                required
              />
              <div class="invalid-feedback">
                Ingrese el nombre del investigador
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="inputApellidoInvestigador">Apellido</label>
              <input
                v-model="last_name"
                type="text"
                class="form-control"
                id="inputApellidoInvestigador"
                placeholder="Apellido"
                required
              />
              <div class="invalid-feedback">
                Ingrese el apellido del investigador
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCedulaInvestigador">Cedula</label>
              <input
                v-model="researcher_document"
                type="int"
                class="form-control"
                id="inputCedulaInvestigador"
                placeholder="Cedula"
                required
              />
              <div class="invalid-feedback">
                Ingrese la cedula del investigador
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="inputCorreoInvestigador">Correo</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="inputCorreoInvestigador"
                placeholder="Correo"
                required
              />
              <div class="invalid-feedback">
                Ingrese el correo del investigador
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Contraseña</label
            >
            <input
              type="password"
              class="form-control"
              v-model="password"
              id="exampleInputPassword1"
              placeholder="Contraseña"
              required
            />
            <div class="invalid-feedback">
              Ingrese la contraseña del investigador
            </div>
          </div>

          <button
            type="submit"
            @click.prevent="crearInvestigador"
            class="btn btn-outline-success"
              v-if="!enEdicion"
          >
            Registrar
          </button>

          <button
            type="submit"
            @click.prevent="modificarInvestigador"
              class="btn btn-outline-success"
              v-if="enEdicion"
          >
            Actualizar
          </button>
        </form>
      </section>

      <section class="data">
        <caption>
          Investigadores
        </caption>
        <table class="table">
          <thead>
            <tr>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="investigador in investigadores"
              :key="investigador.researcher_document"
            >
              <td>{{ investigador.researcher_document }}</td>
              <td>{{ investigador.first_name }}</td>
              <td>{{ investigador.last_name }}</td>
              <td>{{ investigador.email }}</td>
              <td>
                <button
                  size="sm"
                  @click.prevent="cargarInvestigador"
                  class="btn btn-outline-primary"
                  id="btn-mod"
                  >Modificar
                </button> <label> </label>
                <button
                  size="sm"
                  @click.prevent="eliminarInvestigador"
                  class="btn btn-outline-danger"
                  id="btn-del"
                  >Eliminar
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
    researcher_document: "",
    cedulaValida: true,
    first_name: "",
    nombreValido: true,
    last_name: "",
    apellidoValido: true,
    email: "",
    correoValido: true,
    password: "",
    investigadores: [],
    enEdicion: false,
    aux: false
  }),

  created: function () {
    this.obtenerInvestigadores();
  },
  methods: {
    obtenerInvestigadores: function () {
      axios
        .get("http://localhost:3001/investigador")
        .then((result) => {
          this.investigadores = result.data;
        });
    },
    crearInvestigador: function () {
      this.validarFormulario();
      let testPost = {
        first_name: this.first_name,
        last_name: this.last_name,
        researcher_document: this.researcher_document,
        email: this.email,
        password: this.password
      };
      axios.post('http://localhost:3001/investigador', testPost).then((resp) => {
        if (resp.data.name == 'error') {
          this.limpiarCampos();
          alert('No se puede ingresar usuario porque el nro. de cedula ya se encuentra registrado');
        } else if(resp.data.ok) {
          this.limpiarCampos();
          this.obtenerInvestigadores();
          alert('Investigador registrado');
        }
      })
      
    },

    cargarInvestigador: function(e){
      this.enEdicion = true
      var fila = e.target.parentNode.parentNode; //Se almacena en una variable a la fila que la contiene
      document.getElementById("inputCedulaInvestigador").setAttribute("disabled", "")

      this.researcher_document = fila.cells[0].textContent
      this.first_name = fila.cells[1].textContent
      this.last_name = fila.cells[2].textContent
      this.email = fila.cells[3].textContent
      this.password = "---"
    },

    modificarInvestigador: function(){
      this.validarFormulario();
      let testPut = {
        researcher_document: this.researcher_document,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
      };
      axios.put(`http://localhost:3001/investigador/${testPut.researcher_document}`, testPut).then((resp) => {
        this.obtenerInvestigadores();
        if (resp.data.name == 'error') {
          alert('No se puede actualizar el usuario');
        }
        this.limpiarCampos();
        document.getElementById("inputCedulaInvestigador").removeAttribute("disabled")
      });
      alert('Investigador Actualizado')
      this.enEdicion = false
    },

    eliminarInvestigador: function(e){
      var fila = e.target.parentNode.parentNode; //Se almacena en una variable a la fila que la contiene
      var toDelete = fila.cells[0].textContent

      var confirmar = confirm("¿Seguro que desea eliminar este investigador de la base de datos?")
      if(confirmar){
        axios.delete(`http://localhost:3001/investigador/${toDelete}`).then((resp) => {
          this.obtenerInvestigadores();
          if (resp.data.name == 'error') {
            alert('No se puede eliminar el usuario');
          }
        });
        alert('Investigador Eliminado')
      }else{
        alert('Eliminación cancelada')
      }
    },

    validarFormulario: function () {
      if (!this.first_name) {
        this.nombreValido = false;
      }
      if (!this.last_name) {
        this.apellidoValido = false;
      }
      if (!this.researcher_document) {
        this.cedulaValida = false;
      }
      if (!this.email || !this.validarCorreo(this.email)) {
        this.correoValido = false;
      }
    },
    validarCorreo: function (email) {
      var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regexEmail.test(email.toLowerCase());
    },
    limpiarCampos: function(){
      this.researcher_document = "",
      this.first_name = "",
      this.last_name = "",
      this.email = "",
      this.password = ""
    }
  },
};
</script>

<style>
.container {
 text-align: center;
}
</style>
