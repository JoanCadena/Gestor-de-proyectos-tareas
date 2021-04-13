<template>
  <div id="anexar_archivos" class="home">
    <HelloWorld msg="Registro de archivos en espacio de trabajo" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    />
    <br />

    <div class="container">
      <form @submit.prevent="enviarArchivo" enctype="multipart/form-data" class="was-validated">

        <div class="mb-3">
          <label for="selectIdCompromiso" class="form-label"
            >Compromiso</label
          >
          <select
            v-model="nombreCompromiso"
            class="form-select"
            aria-label="selectCompromiso"
            id="selectIdCompromiso"
            required
          >
            <option value="">Selecciona el nombre del compromiso</option>
          </select>
          <div class="invalid-feedback">Selecciona un compromiso</div>
        </div>

        <br />
        <hr />
        <br />

        <div class="mb-3">
          <label for="descripcion" class="form-label"
            >Archivo del compromiso para adjuntar</label
          >
          <div class="custom-file">
            <input
              @change="cargarArchivo"
              type="file"
              ref="file"
              class="custom-file-input"
              id="inputArchivo"
              required
            />
            <label class="custom-file-label" for="inputGroupFile02"
              >Elegir Archivo</label
            >
          </div>
        </div>
        <button
          type="submit"
          id="btnArchivo"
          class="btn btn-outline-success"
        >
          Enviar entrega
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "AnexarArchivos",
  components: {
    HelloWorld,
  },
  data: () => ({
    cedulaInvestigador: "",
    nombreCompromiso: '',
    descripcionEntrega: "",
    compromisos: [],
    archivo: "",
  }),
  created: function () {
    this.obtenerCompromisos();
  },
  methods: {
    cargarArchivo() {
      this.archivo = this.$refs.file.files[0];
      console.log(this.archivo.name);
    },
    stringToHTML: function(s){
      const parser = new DOMParser();
      const doc = parser.parseFromString(s, "text/html");
      return doc.body.firstChild;
    },
    obtenerCompromisos: function () {
      axios.get("http://localhost:3001/compromiso")
        .then((result) => {
          this.compromisos = result.data.info
          for (let i = 0; i < this.compromisos.length; i++) {
            var html = this.stringToHTML(`<option value=${this.compromisos[i]['idcompromise']}>${this.compromisos[i]['compromise_name']}</option>`);
            document.getElementById('selectIdCompromiso').appendChild(html)
          }
        });
    },
    enviarArchivo() {
      console.log("Enviando: " + this.archivo.name);
      
      const formData = new FormData()
      
      formData.append("file", this.archivo) 
      
      axios.post("https://subir-archivo.free.beeceptor.com/subir-archivo", formData).then((resp) => {
        console.log(resp);
        alert("Se ha subido correctamente: " + this.archivo.name)
      })
    },
  },
};
</script>

<style>
</style>

