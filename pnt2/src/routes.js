import Platos from '../src/components/ListaPlatos.vue'
import Inicio from '../src/components/InicioPag.vue'
import AppLogin from '../src/components/AppLogin.vue'
import AppRegistro from './components/AppRegistro.vue'
import AppHistorial from '../src/components/AppHistorial.vue'
import AppEstadisticas from '../src/components/AppEstadisticas.vue'
import Pagar from '../components/PagPagar.vue'

const routes = [
  { path: '/platos', component: Platos },
  { path: '/inicio', component: Inicio },
  { path: '/login', component: AppLogin },
  { path: '/registrarse', component: AppRegistro },
  { path: '/historial', component: AppHistorial },
  { path: '/pagar', component: Pagar },
  { path: '/estadisticas', component: AppEstadisticas },
]

export default routes