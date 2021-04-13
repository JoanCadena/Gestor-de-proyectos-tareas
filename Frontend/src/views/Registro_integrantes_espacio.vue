<template>
  <div id="integrantes_espacio_trabajo" class="home">
    <!-- <img alt="Vue logo" src="../static/logo.png"> -->
    <HelloWorld msg="Registro de integrantes en el espacio" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    />

    <br />

    <div class="container">
      <form class="was-validated">
        <div class="mb-3">
          <label for="inputIdEspacioTrabajo" class="form-label"
            >Espacio de trabajo</label
          >
          <select
            v-model="idEspacioDeTrabajo"
            class="form-select"
            aria-label="selectespacio"
            id="selectIdEspacioTrabajo"
            required
          >
            <option value="">Selecciona un espacio de trabajo</option>
          </select>
          <div class="invalid-feedback">Selecciona un espacio de trabajo</div>
        </div>
        <br />
        <div class="form-row mb-3">
          <div class="col-auto">
            <label>Cedula investigador</label>
          </div>
          <div class="col-auto">
            <label for="inputCedulaInvestigador" class="visually-hidden"
              >Cedula investigador</label
            >
            <input
              v-model="idInvestigador"
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
          <div class="col-auto">
            <button
              type="submit"
              @click.prevent="agregarInvestigador"
              class="btn btn-outline-success mb-3"
              v-if="!enEdicion"
            >
              Registrar en el espacio de trabajo
            </button>

            <button
              type="submit"
              @click.prevent="modificarInvestigador"
              class="btn btn-outline-success"
              v-if="enEdicion"
            >
              Actualizar
            </button>
          </div>
        </div>
      </form>

      <section class="data">
        <caption>
          Integrantes
        </caption>
        <table class="table">
          <thead>
            <tr>
              <th>Codigo integrante</th>
              <th>Cedula integrante</th>
              <th>Espacio Trabajo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="integrante in integrantes" :key="integrante.idreseacher">
              <td>{{ integrante.idresearcher_workspace }}</td>
              <td>{{ integrante.researcher_document }}</td>
              <td>{{ integrante.idworkspace }}</td>
              <td
                v-if="
                  !enEdicion || idInvestigador != integrante.researcher_document
                "
              >
                {{ integrante.idrole }}
              </td>
              <td
                v-if="
                  enEdicion && idInvestigador == integrante.researcher_document
                "
              >
                <select
                  v-model="rolInvestigador"
                  class="form-select"
                  aria-label="selectRol"
                  id="selectRol"
                  required
                >
                  <option value="0">Sin rol</option>
                  <option value="1">Co investigador</option>
                  <option value="2">Auxiliar de investigacion</option>
                  <option value="3">Investigador asociado</option>
                </select>
                <label> </label>
              </td>
              <td>
                <button
                  size="sm"
                  @click.prevent="cargarIntegrante"
                  class="btn btn-outline-primary"
                  id="btn-mod"
                >
                  Modificar rol
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
    idEspacioDeTrabajo: "",
    idWorkValido: true,
    espaciosTrabajo: [],
    idInvestigador: "",
    idInvValido: true,
    investigadores: [],
    integrantes: [],
    rolInvestigador: "",
    enEdicion: false,
  }),
  created: function () {
    this.obtenerEspaciosDeTrabajo();
    this.obtenerIntegrantesEspacio();
  },
  methods: {
    obtenerEspaciosDeTrabajo: function () {
      axios.get("http://localhost:3001/workspace").then((result) => {
        this.espaciosTrabajo = result.data.info;
        for (let i = 0; i < this.espaciosTrabajo.length; i++) {
          var html = this.stringToHTML(
            `<option value=${this.espaciosTrabajo[i]["idworkspace"]}>${this.espaciosTrabajo[i]["workspace_name"]}</option>`
          );
          document.getElementById("selectIdEspacioTrabajo").appendChild(html);
        }
      });
    },
    stringToHTML: function (s) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(s, "text/html");
      return doc.body.firstChild;
    },

    obtenerIntegrantesEspacio: function () {
      axios.get("http://localhost:3001/integrante").then((result) => {
        this.integrantes = result.data.info;
        for (let i = 0; i < this.integrantes.length; i++) {
          const aux = this.integrantes[i];
          switch (aux["idrole"]) {
            case 0:
              this.integrantes[i]["idrole"] = "Por Asignar Rol";
              break;
            case 1:
              this.integrantes[i]["idrole"] = "Co-Investigador";
              break;
            case 2:
              this.integrantes[i]["idrole"] = "Auxiliar-Investigador";
              break;
            case 3:
              this.integrantes[i]["idrole"] = "investigador-Asociado";
              break;
            default:
              break;
          }
        }
      });
    },

    cargarIntegrante: function (e) {
      this.enEdicion = true;
      var fila = e.target.parentNode.parentNode; //Se almacena en una variable a la fila que la contiene
      document
        .getElementById("inputCedulaInvestigador")
        .setAttribute("disabled", "");
      document
        .getElementById("selectIdEspacioTrabajo")
        .setAttribute("disabled", "");

      this.idInvestigador = fila.cells[1].textContent;
      this.idEspacioDeTrabajo = fila.cells[2].textContent;
    },
    validarFormulario: function () {
      if (!this.idEspacioDeTrabajo) {
        this.idWorkValido = false;
      }
      if (!this.idInvestigador) {
        this.idInvValido = false;
      }
    },
    limpiarCampos: function () {
      this.idEspacioDeTrabajo = "";
      this.idInvestigador = "";
    },
    agregarInvestigador: function () {
      this.validarFormulario();
      let testPost = {
        researcher_document: this.idInvestigador,
        idworkspace: this.idEspacioDeTrabajo,
      };
      axios.post("http://localhost:3001/integrante", testPost).then((resp) => {
        if (resp.data.name == "error") {
          this.limpiarCampos();
          alert(
            "No se puede ingresar el integrante porque ya se encuentra registrado"
          );
        } else if (resp.data.ok) {
          this.limpiarCampos();
          alert("Integrante registrado");
        }
      });
      this.obtenerIntegrantesEspacio();
    },
    modificarInvestigador: function () {
      this.validarFormulario();
      let testPut = {
        idrole: this.rolInvestigador,
        idworkspace: this.idEspacioDeTrabajo,
        researcher_document: this.idInvestigador,
      };
      axios
        .put(
          `http://localhost:3001/integrante/${testPut.idrole}/${testPut.researcher_document}/${testPut.idworkspace}`,
          testPut
        )
        .then((resp) => {
          if (resp.data.name == "error") {
            alert("No se puede actualizar el usuario");
          }
          this.limpiarCampos();
          this.obtenerIntegrantesEspacio();
          document
            .getElementById("inputCedulaInvestigador")
            .removeAttribute("disabled");
          document
            .getElementById("selectIdEspacioTrabajo")
            .removeAttribute("disabled");
        });
      alert("Investigador Actualizado");
      this.enEdicion = false;
    },
  },
};
</script>