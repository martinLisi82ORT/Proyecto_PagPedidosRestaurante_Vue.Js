<template>
  <div class="background-image">

    <header class="header">
      <button class="button-inicio" @click="inicio">Inicio</button>
    </header>

    <div class="registro-container">
      <h1 class="register-title">Registrarse</h1>
      <input type="text" v-model="email" placeholder="Email">
      <input type="text" v-model="usuario" placeholder="Usuario" maxlength="20">
      <input type="password" v-model="contrasenia" placeholder="Contraseña">
      <input type="text" v-model="edad" placeholder="Edad" maxlength="2">
      <input type="text" v-model="apellido" placeholder="Apellido" maxlength="20">
      <button @click="registrarse">Registrarse</button>
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
      <div v-if="showAlert" class="alert">
        <span class="close" @click="showAlert = false">&times;</span>
        {{ alertMessage }}
      </div>
      <div v-if="usuarioCreado" class="alert success">
        <span class="close" @click="usuarioCreado = false">&times;</span>
        Usuario registrado exitosamente
      </div>
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
    const contrasenia = ref('');
    const email = ref('');
    const edad = ref('');
    const apellido = ref('');
    const errorMessage = ref('');
    const showAlert = ref(false);
    const usuarioCreado = ref(false);
    const alertMessage = ref('');

    const inicio = () => {
      router.push("/");
    };

    const registrarse = async () => {
      if (!validarDatos()) return;

      await store.registrarse(usuario.value, contrasenia.value, email.value, edad.value, apellido.value);

      if (store.errorMessage === '') {
        usuarioCreado.value = true; // Mostrar el mensaje de usuario creado
        showAlert.value = false; // Ocultar la alerta de error
        setTimeout(() => {
          usuarioCreado.value = false; // Ocultar el mensaje de usuario creado después de 2 segundos
          router.push('/login');
        }, 2000);
      } else {
        showAlert.value = true; // Mostrar la alerta de error
        alertMessage.value = store.errorMessage;
      }
    };

    const validarDatos = () => {
      if (!usuario.value || !contrasenia.value || !email.value || !edad.value || !apellido.value) {
        errorMessage.value = 'Todos los campos son requeridos.';
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Por favor, ingrese un correo electrónico válido.';
        return false;
      }

      if (!Number.isInteger(parseInt(edad.value)) || parseInt(edad.value) <= 0) {
        errorMessage.value = 'Por favor, ingrese una edad válida.';
        return false;
      }

      if (apellido.value.trim() === '') {
        errorMessage.value = 'Por favor, ingrese un apellido válido.';
        return false;
      }

      return true;
    };

    return {
      usuario,
      contrasenia,
      email,
      edad,
      apellido,
      errorMessage,
      showAlert,
      usuarioCreado,
      alertMessage,
      registrarse,
      inicio
    };
  }
}
</script>

<style scoped>
.background-image {
  background-image: url('../assets/fotito.avif');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.registro-container {
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

.register-title {
  margin-bottom: 20px;
  font-size: 28px;
  color: black;
  font-weight: 900;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

input {
  display: block;
  width: 75%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
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

.alert {
  position: relative;
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  margin-bottom: 10px;
}

.success {
  background-color: #4caf50;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.header {
  background-color: transparent;

}

.button-inicio {
  background-color: transparent;
  text-align: right;
}

.button-inicio:hover {
  color: yellow;
}

.error {
  color: red;
}

</style>
