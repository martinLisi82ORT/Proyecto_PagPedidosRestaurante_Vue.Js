<template>
  <div class="container">
    <header>
      <button v-if="mostrarHistorial()" class="menu-button" @click="irAHistorial">Historial</button>
      <button v-if="mostrarEstadisticas()" class="ingresar-button" @click="irAEstadisticas">Estadisticas</button>
      <button class="menu-button" @click="irAPlatos">Menu</button>
      <!-- En App.vue la llame /login => tengo q usar esa direccion. --- <RouterLink to="/AppLogin">Abrir login</RouterLink> -->
      <!-- <RouterLink to="/login">Abrir login</RouterLink>-->
      <button class="ingresar-button" @click="irALogin">Ingresar</button>
    </header>

    <main>
      <h1 class="titulo">RESTO VUE PEDIDOS</h1>
    </main>

    <footer>
      <p>Dirección: Av. Falsa 1234</p>
      <p>Teléfono: 555-555</p>
    </footer>
  </div>
</template>

<style src="../styles/inicioStyles.css" scoped></style>
<style src="../styles/appHistorialStyles.css" scoped></style>
<style src="../styles/listaPlatosStyles.css" scoped></style>

<script>
import AuthStore from '@/stores/AuthStore';

// import { ref } from 'vue';
// const esUsuario = ref(true)  


export default {
  name: 'InicioPag',
  methods: {
    irAPlatos() {
      this.$router.push('/platos');
    },
    irALogin() {
      this.$router.push('/login');
    },
    irAEstadisticas() {
  if (AuthStore().getUsuario().mail === "asd@asd.com") {
    this.$router.push('/estadisticas');
  }
},
    irAHistorial() {
      this.$router.push('/historial');
    },
    mostrarHistorial() {
      const usuario = AuthStore().hayUsuarioAutenticado;
      const administrador =  AuthStore().getUsuario().mail;
      return usuario && administrador != "asd@asd.com";
    },
    mostrarEstadisticas() {
  const usuarioAutenticado = AuthStore().hayUsuarioAutenticado;
  const usuarioMail = AuthStore().getUsuario().mail;
  return usuarioAutenticado && usuarioMail === "asd@asd.com";
}
  }
}
</script>
