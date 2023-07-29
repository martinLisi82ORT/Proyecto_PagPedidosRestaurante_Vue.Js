import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Platos from './components/ListaPlatos.vue';
import Inicio from './components/InicioPag.vue';
import Login from './components/AppLogin.vue';
import AppRegistro from './components/AppRegistro.vue'
import Historial from './components/AppHistorial.vue';
import Pagar from './components/PagPagar.vue';
import AppEstadisticas from '../src/components/AppEstadisticas.vue'

const routes = [
  { path: '/platos', component: Platos },
  { path: '/', component: Inicio },
  { path: '/login', component: Login },
  { path: '/registrarse', component: AppRegistro },
  { path: '/historial', component: Historial },
  { path: '/pagar', component: Pagar },
  { path: '/estadisticas', component: AppEstadisticas },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).mount('#app');