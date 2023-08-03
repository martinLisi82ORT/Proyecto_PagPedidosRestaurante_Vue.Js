<template>
  <div v-if="useAuthStore().mostrarEstadisticas()">
    <div class="fondo">
      <header class="header">
        <button class="inicio-button" @click="volver">Volver</button>
      </header>
      <div class="estadisticas">
        <h1>Estadísticas de Platos</h1>
        <div class="seccion">
          <h2>Total de platos</h2>
          <p>{{ totalPlatos }}</p>
        </div>
        <div class="seccion">
          <h2>Platos favoritos</h2>
          <p>{{ platosFavoritos }}</p>
        </div>
        <div class="seccion">
          <h2>Platos más populares</h2>
          <p>{{ platosPopulares }}</p>
        </div>
        <div class="seccion">
          <h2>Plato más caro</h2>
          <p>{{ platoMasCaro }}</p>
        </div>
        <div class="seccion">
          <h2>Plato más barato</h2>
          <p>{{ platoMasBarato }}</p>
        </div>
        <div class="seccion">
          <h2>Promedio de precios (entre todos los usuarios)</h2>
          <p>${{ promedioPrecios }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="estadisticas">
      <p>Esta pagina no se encuentra disponible en este momento...</p>
    </div>
  </div>
</template>

<script setup>

import { useRouter } from "vue-router";
import useAuthStore from '../stores/AuthStore';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const usuarios = ref([]);
const totalPlatos = ref(0);
const platosFavoritos = ref('');
const platosPopulares = ref('');
const platoMasCaro = ref('');
const platoMasBarato = ref('');
const promedioPrecios = ref(0);

onMounted(async () => {
  await cargarUsuarios();
  cargarEstadisticasPlatos();
});

const volver = () => {
  router.push("/");
};

const cargarUsuarios = async () => {
  try {
    const response = await axios.get('https://649141342f2c7ee6c2c7e399.mockapi.io/usuarios/users');
    usuarios.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const cargarEstadisticasPlatos = () => {
  totalPlatos.value = calcularTotalPlatos();
  platosFavoritos.value = obtenerPlatosFavoritos();
  platosPopulares.value = obtenerPlatosPopulares();
  platoMasCaro.value = obtenerPlatoMasCaro();
  platoMasBarato.value = obtenerPlatoMasBarato();
  promedioPrecios.value = calcularPromedioPrecios();
};

const calcularTotalPlatos = () => {
  let total = 0;
  usuarios.value.forEach(usuario => {
    if (usuario.listaPlatos) {
      total += usuario.listaPlatos.length;
    }
  });
  return total;
};

const obtenerPlatosFavoritos = () => {
  const platosFavoritosMap = new Map();
  usuarios.value.forEach(usuario => {
    if (usuario.listaPlatos) {
      usuario.listaPlatos.forEach(plato => {
        if (platosFavoritosMap.has(plato.id)) {
          platosFavoritosMap.set(plato.id, platosFavoritosMap.get(plato.id) + 1);
        } else {
          platosFavoritosMap.set(plato.id, 1);
        }
      });
    }
  });

  const platosOrdenadosPorPedidos = [...platosFavoritosMap.entries()].sort((a, b) => b[1] - a[1]);

  const platosMasPedidos = platosOrdenadosPorPedidos.slice(0, 3).map(([platoId]) => {
    const usuarioQuePidio = usuarios.value.find(usuario =>
      usuario.listaPlatos.some(plato => plato.id === platoId)
    );
    const plato = usuarioQuePidio.listaPlatos.find(plato => plato.id === platoId);
    return plato ? plato.nombre : '';
  });

  return platosMasPedidos.join(', ');
};

const obtenerPlatosPopulares = () => {
  const platosPopularesMap = new Map();
  usuarios.value.forEach(usuario => {
    if (usuario.listaPlatos) {
      usuario.listaPlatos.forEach(plato => {
        if (platosPopularesMap.has(plato.id)) {
          platosPopularesMap.set(plato.id, platosPopularesMap.get(plato.id) + 1);
        } else {
          platosPopularesMap.set(plato.id, 1);
        }
      });
    }
  });

  const platosOrdenadosPorPopularidad = [...platosPopularesMap.entries()].sort((a, b) => b[1] - a[1]);

  const platosPopularesIds = platosOrdenadosPorPopularidad.map(([platoId]) => platoId);

  const platosPopularesSet = new Set();

  usuarios.value.forEach(usuario => {
    if (usuario.listaPlatos) {
      usuario.listaPlatos.forEach(plato => {
        if (platosPopularesIds.includes(plato.id)) {
          platosPopularesSet.add(plato.nombre);
        }
      });
    }
  });

  return [...platosPopularesSet].join(', ');
};

const obtenerPlatoMasCaro = () => {
  let platoMasCaroPrecio = 0;
  let platoMasCaroNombre = '';

  usuarios.value.forEach(usuario => {
    if (usuario.listaPlatos) {
      usuario.listaPlatos.forEach(plato => {
        if (plato.precio > platoMasCaroPrecio) {
          platoMasCaroPrecio = plato.precio;
          platoMasCaroNombre = plato.nombre;
        }
      });
    }
  });

  return platoMasCaroNombre;
};

const obtenerPlatoMasBarato = () => {
  let platoMasBaratoPrecio = Number.MAX_SAFE_INTEGER;
  let platoMasBaratoNombre = '';

  usuarios.value.forEach(usuario => {
    if (usuario.listaPlatos) {
      usuario.listaPlatos.forEach(plato => {
        if (plato.precio < platoMasBaratoPrecio) {
          platoMasBaratoPrecio = plato.precio;
          platoMasBaratoNombre = plato.nombre;
        }
      });
    }
  });

  return platoMasBaratoNombre;
};

const calcularPromedioPrecios = () => {
  let totalPrecios = 0;
  let totalPlatos = 0;

  usuarios.value.forEach(usuario => {
    if (usuario.listaPlatos) {
      usuario.listaPlatos.forEach(plato => {
        totalPrecios += plato.precio;
        totalPlatos++;
      });
    }
  });

  return totalPlatos > 0 ? (totalPrecios / totalPlatos).toFixed(2) : 0;
};
</script>

<style scoped>
.estadisticas {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
  margin: 0 auto;
  max-width: 500px;
}

.fondo {
  background-image: url('../assets/alfajor.webp');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

h2 {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 5px;
}

.seccion {
  margin-bottom: 20px;
}

.header {
  padding: 15px;
  text-align: right;
}

.inicio-button {
  background-color: transparent;
  border: none;
  color: black;
  text-align: right;
  font-size: 18px;
  cursor: pointer;
  font-weight: 700;
}

.inicio-button:hover {
  color: white;
}
</style>
