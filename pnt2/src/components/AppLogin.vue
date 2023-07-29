<template>
    <div class="background-image">
  <div class="login-container">
    <h1 class="login-title">Iniciar sesión</h1>
    <div class="form-group">
      <input type="text" v-model="usuario" placeholder="Correo electrónico" class="input-field">
    </div>
    <div class="form-group">
      <input type="password" v-model="password" placeholder="Contraseña" class="input-field">
    </div>
    <button @click="entrar" class="login-button">Entrar</button>
    <button @click="irARegistro" class="register-button">Registrarse</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import useAuthStore from '../stores/AuthStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const usuario = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const entrar = async () => {
      const loginSuccessful = await store.login(usuario.value, password.value);
      if (loginSuccessful) {
        errorMessage.value = '';
        router.push('/');
      } else {
        errorMessage.value = 'Credenciales inválidas';
      }
    };

    const irARegistro = () => {
      router.push('/registrarse');
    };

    return {
      usuario,
      password,
      errorMessage,
      entrar,
      irARegistro
    };
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.background-image {
  background-image: url('../assets/login.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


.login-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: black;
}

.input-field {
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-group {
  margin-bottom: 15px;
}

.login-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 18px;
}

.register-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 18px;
}

.error-message {
  color: red;
  font-size: 16px;
}
</style>
