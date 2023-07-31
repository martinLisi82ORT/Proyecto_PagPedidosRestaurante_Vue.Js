<template>
  <div class="background-image">


    <div class="creditCardForm">
      <div class="heading">
        <h1>REALIZAR PAGO</h1>
      </div>
      <div class="user-info">
        <p>{{ nomUsuario() }}, por favor, ingrese sus datos:</p>
      </div>
      <div class="payment">
        <form>
          <div class="form-group">
            <label for="owner">Dueño</label>
            <input type="text" class="form-control" id="owner">
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" class="form-control" id="cvv">
          </div>
          <div class="form-group" id="card-number-field">
            <label for="cardNumber">Número de la tarjeta</label>
            <input type="text" class="form-control" id="cardNumber">
          </div>
          <div class="form-group" id="expiration-date">
            <label>Fecha de caducidad</label>
            <div class="select-wrapper">
              <select>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
            <div class="select-wrapper">
              <select>
                <option value="16">2023</option>
                <option value="17">2024</option>
                <option value="18">2025</option>
                <option value="19">2026</option>
                <option value="20">2027</option>
                <option value="21">2028</option>
              </select>
            </div>
          </div>

          <div class="total-price">
            <p>Precio Total: {{ calcularTotal(datosDePago) }}</p>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-default" id="confirm-purchase"
              @click="confirmarPago(123)">Confirmar</button>
          </div>

          <div class="menu-button">
            <button class="button-volver" @click="volverAMenu()">Ir a menú</button>
          </div>
        </form>
      </div>

      <div class="selected-dishes">
        <p>Platos seleccionados:</p>
        <div v-if="platosSeleccionado.length > 0">
          <div v-for="item in platosSeleccionado" :key="item.nombre">
            <p>Nombre: {{ item.nombre }}</p>
            <p>Precio: {{ item.precio }}</p>
          </div>
        </div>
        <div v-else>
          <p>No se ha seleccionado ningún plato</p>
        </div>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-if="success" id="success" class="success-message">
        Pago concretado con éxito.
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuthStore from '@/stores/AuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();
const platosSeleccionado = store.listaPlatos;
const error = ref(null);
const success = ref(false);

function nomUsuario() {
  return store.getNomYAp();
}

function calcularTotal() {
  return platosSeleccionado.reduce((total, plato) => total + plato.precio, 0);
}

function confirmarPago(datosDePago) {
  try {
    if (generarPago(datosDePago)) {
      success.value = true;
      window.alert("Pago realizado con exito");
      router.push('/');
    }
  } catch (error) {
    error.value = error.message;
    alert(error);
  }
}

function generarPago(datosDePago) {
  if (datosDePago != null) {
    return true;
  }
}

function volverAMenu() {
  router.push('/platos');
  store.vaciarListaPlatos();
}

</script>

<style>
.background-image {
  background-image: url('../assets/tarjetas.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.creditCardForm {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: rgb(197, 226, 217);
}

.heading {
  text-align: center;
  margin-bottom: 20px;
}

.user-info p {
  margin-bottom: 10px;
}

.payment {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-control {
  width: 85%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.select-wrapper {
  display: inline-block;
  margin-right: 10px;
}

.total-price {
  margin-bottom: 15px;
}

.btn-default {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.menu-button {
  text-align: center;
  margin-bottom: 20px;
}

.button-volver {
  background-color: #643ba5;
  color: #fff;
  padding: 10px 60px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.selected-dishes {
  margin-bottom: 20px;
}

.selected-dishes p {
  font-weight: bold;
  margin-bottom: 5px;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.success-message {
  color: green;
  margin-bottom: 10px;
}
</style>
