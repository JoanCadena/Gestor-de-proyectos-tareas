<template>
  <div id="app">
    <div id="nav"  >
      <img class="Logoudem" src="../src/static/logoudem.png" height="150" width="180">
      <div id="links">
        <router-link class="link" to="/Registro_investigadores"> Investigadores </router-link> 
        <router-link class="link" to="/Registro_espacio"> Espacios de trabajo </router-link> 
        <router-link class="link" to="/Registro_integrantes_espacio">Integrantes del espacio </router-link> 
        <router-link class="link" to="/Crear_compromiso"> Compromiso </router-link> 
        <router-link class="link" to="/anexar_archivos"> Archivos </router-link>
      </div>
    </div>
    <router-view/>
  </div>
  
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}

#nav{
  margin-top: 5px;
  margin-bottom: 110px;
}

#nav .Logoudem{
  position: absolute;
  margin-left: 80px;
  
  
}

#nav #links{
  background: #BA0F16;
  margin-bottom: 30px;
  padding: 10px;
  text-align: center;
  
  
}

#nav a {
  font-weight: bold;
  color: #FFFFFF;
  font-size: 12px;
  margin-left: 6px;
}

#nav a:hover {
  color: #F68788;
}


/*#nav a.router-link-exact-active {
  
}*/

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
