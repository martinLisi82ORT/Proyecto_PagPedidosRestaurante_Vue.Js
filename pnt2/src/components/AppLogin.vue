<template>
  <!-- <nav class="header">
    <div class="navbar">
      <h1 class=" navbar-title-center">Resto Vue Pedidos</h1>
    </div>
    <div>

      <button class="volver-button" @click="volver">Volver</button>
    </div>
  </nav> -->

  <div class="background-image">

    <header class="header">
      <button class="button-inicio" @click="volver">Volver</button>
    </header>

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

<!-- <style src="../styles/appHistorialStyles.css" scoped></style>
<style src="../styles/inicioStyles.css" scoped></style>
<style src="../styles/listaPlatosStyles.css" scoped></style> -->

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

    const volver = () => {
      router.push("/");
    };

    const irARegistro = () => {
      router.push('/registrarse');
    };

    return {
      usuario,
      password,
      errorMessage,
      entrar,
      irARegistro,
      volver
    };
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid black;
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
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

.navbar {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  position: fixed;
  top: 20px;
  left: 0;
  right: 15px;
  background-color: transparent;
  padding: 2px;
  cursor: pointer;
  text-align: right;
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

.button-inicio {
  background-color: transparent;
  border: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
  font-weight: 700;
  text-align: right;
}

.button-inicio:hover{
  color: white;
}

</style>
