<template>
  <router-view />
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router';
import Platos from './components/ListaPlatos.vue';
import Inicio from './components/InicioPag.vue';
import Login from './components/AppLogin.vue';
import AppRegistro from './components/AppRegistro.vue'
import Informes from './components/AppHistorial.vue';
import Pagar from './components/PagPagar.vue';

const routes = [
  { path: '/platos', component: Platos },
  { path: '/', component: Inicio },
  { path: '/login', component: Login },
  { path: '/login', component: AppRegistro },
  { path: '/informes', component: Informes },
  { path: '/pagar', component: Pagar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default {
  name: 'App',
  router
};
</script>
