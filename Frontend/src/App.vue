<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Registro_investigadores">Investigadores</router-link> |
      <router-link to="/Registro_espacio">Espacios de trabajo</router-link> |
      <router-link to="/Registro_integrantes_espacio">Integrantes del espacio</router-link> |
      <router-link to="/Crear_compromiso">Compromiso</router-link> |
      <router-link to="/anexar_archivos">Archivos</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a:hover {
  color: #89bba4;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.form-row{
  margin-left: 150px;
  margin-right: 150px;
}

.data{
  margin-bottom: 60px;
}

#btnArchivo{
  margin-bottom: 60px;
}

.btn-mod{
  border-radius: 5px;
  font-size: 15px;
}

.btn-del{
  border-radius: 5px;
  font-size: 15px;
}
</style>
