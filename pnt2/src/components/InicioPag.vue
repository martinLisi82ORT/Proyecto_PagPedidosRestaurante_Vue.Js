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

    <main class="nombre">
      <!-- <h1 class="titulo">RESTO VUE PEDIDOS</h1> -->
      <!-- <h1 class="resto">RestoVue<span class="pedidos">Pedidos</span></h1> -->

      <ul class="restovue">
        <li>R</li>
        <li>E</li>
        <li>S</li>
        <li>T</li>
        <li>O</li>
        <li>V</li>
        <li>U</li>
        <li>E</li>
      </ul>

      <ul class="pedidos">
        <li>P</li>
        <li>E</li>
        <li>D</li>
        <li>I</li>
        <li>D</li>
        <li>O</li>
        <li>S</li>
      </ul>

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
      // if (AuthStore().getUsuario().mail === "asd@asd.com") {
      if (AuthStore().getUsuario().mail === "admin@admin") {
        this.$router.push('/estadisticas');
      }
    },
    irAHistorial() {
      this.$router.push('/historial');
    },
    mostrarHistorial() {
      const usuario = AuthStore().hayUsuarioAutenticado;
      const administrador = AuthStore().getUsuario().mail;
      return usuario && administrador != "admin@admin";
    },
    mostrarEstadisticas() {
      const usuarioAutenticado = AuthStore().hayUsuarioAutenticado;
      const usuarioMail = AuthStore().getUsuario().mail;
      return usuarioAutenticado && usuarioMail === "admin@admin";
    }
  }
}
</script>
