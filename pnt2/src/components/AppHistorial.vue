<template>
  <nav class="navbar">
    <div class="navbar-sections-center">
      <h1 class="navbar-title navbar-title-center">Resto Vue Pedidos</h1>
    </div>
    <div>
      <button class="inicio-button" @click="volver">Inicio</button>
    </div>
  </nav>
  <div class="container1">
    <header></header>
    <main class="main">
      <div class="formulario">
        <h2 class="h2">Historial de compras</h2>
        <h2 v-if="store.getUsuario">Cliente: {{ store.getNomYAp() }}</h2>
        <p class="platos">Platos:</p>

        <div v-for="item in platosSeleccionado" :key="item">
          <li>{{ item.nombre }} || Precio $ {{ item.precio }}</li>
        </div>

        <p class="gastoTotal" v-if="store.getUsuario">Gasto Total $ {{ calcularGastoTotal() }}</p>
        <h3>Estadísticas de Platos Más Pedidos:</h3>
        <ul>
          <li v-for="plato in obtenerPlatosMasPedidos()" :key="plato.nombre">
            {{ plato.nombre }} (Pedidos: {{ plato.cantidad }})
          </li>
        </ul>

        <div class="contenedor-campos"></div>
      </div>
    </main>
  </div>
  <footer>
    <p>Dirección: Av. Falsa 1234</p>
    <p>Teléfono: 555-555</p>
  </footer>
  <router-view></router-view>
</template>

<style src="../styles/appHistorialStyles.css" scoped></style>
<style src="../styles/inicioStyles.css" scoped></style>
<style src="../styles/listaPlatosStyles.css" scoped></style>

<script setup>
import { useRouter } from "vue-router";
import useAuthStore from "../stores/AuthStore";

const store = useAuthStore();
const platosSeleccionado = store.historialListaPlatos;
const router = useRouter();

const volver = () => {
  router.push("/");
};

const calcularGastoTotal = () => {
  let total = 0;
  for (const plato of platosSeleccionado) {
    total += plato.precio;
  }
  return total;
};

const obtenerPlatosMasPedidos = () => {
  const platosPedidos = {};
  for (const plato of platosSeleccionado) {
    if (plato.nombre in platosPedidos) {
      platosPedidos[plato.nombre].cantidad++;
    } else {
      platosPedidos[plato.nombre] = {
        nombre: plato.nombre,
        cantidad: 1,
      };
    }
  }
  const platosMasPedidos = Object.values(platosPedidos);
  platosMasPedidos.sort((a, b) => b.cantidad - a.cantidad);
  return platosMasPedidos;
};
</script>
