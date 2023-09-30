import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';
import { find } from 'lodash';

export default defineStore('auth', () => {
  const id = ref(null);
  const nombre = ref(null);
  const apellido = ref(null);
  const edad = ref(null);
  const mail = ref(null);
  const listaPlatos = ref(null);
  const errorMessage = ref('');
  const historialListaPlatos = ref(null);
  

  async function login(mailIngresado, passwordIngresada) {
    try {
      const response = await axios.get('https://650dfa08a8b42265ec2ce076.mockapi.io/users');
      // const response = await axios.get('https://649141342f2c7ee6c2c7e399.mockapi.io/usuarios/users');
      const usuariosDesdeElServicio = response.data;
  
      const usuarioEncontrado = usuariosDesdeElServicio.find(usuario => {
        return (
          String(usuario.mail).toLowerCase() === String(mailIngresado).toLowerCase() &&
          String(usuario.contrasenia).toLowerCase() === String(passwordIngresada).toLowerCase()
        );
      });

      if (usuarioEncontrado !== undefined) {
        console.log('Inicio de sesión exitoso');
        // Establecer los datos del usuario autenticado en el almacenamiento
        id.value = usuarioEncontrado.id;
        nombre.value = usuarioEncontrado.nombre;
        apellido.value = usuarioEncontrado.apellido;
        edad.value = usuarioEncontrado.edad;
        mail.value = usuarioEncontrado.mail;
        listaPlatos.value = usuarioEncontrado.listaPlatos;
        historialListaPlatos.value = usuarioEncontrado.listaPlatos;
        errorMessage.value = ''; // Limpiar el mensaje de error
        return true;
      } else {
        console.log('Credenciales inválidas');
        errorMessage.value = 'Credenciales inválidas';
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function registrarse(usuario, contrasenia, email, edadUsuario, apellidoUsuario) {
    const url = 'https://650dfa08a8b42265ec2ce076.mockapi.io/users';
    // const url = 'https://649141342f2c7ee6c2c7e399.mockapi.io/usuarios/users';

    try {
      // Obtener la lista de usuarios existentes
      const response = await axios.get(url);
      const usuariosDesdeElServicio = response.data;
      const id = response.data.length+1;

      // Verificar si ya existe un usuario con el correo electrónico proporcionado
      const usuarioExistente = find(usuariosDesdeElServicio, { mail: email });
      if (usuarioExistente) {
        console.log('Ya existe una cuenta con este correo electrónico');
        errorMessage.value = 'Ya existe una cuenta con este correo electrónico';
        return;
      }

      // Crear el nuevo usuario
      const nuevoUsuario = {
        nombre: usuario,
        apellido: apellidoUsuario,
        edad: edadUsuario,
        mail: email,
        contrasenia: contrasenia,
        listaPlatos: listaPlatos
      };

      const responsePost = await axios.post(url, nuevoUsuario);
      if (responsePost.status === 201) {
        console.log('Usuario registrado exitosamente');

        // Establecer los datos del usuario autenticado en el almacenamiento
        id.value = id;
        nombre.value = usuario;
        apellido.value = apellidoUsuario;
        edad.value = edadUsuario;
        mail.value = email;
        listaPlatos.value = listaPlatos;
        errorMessage.value = '';
      } else {
        console.log('Error en la solicitud. Código de estado:', responsePost.status);
      }
    } catch (error) {
      console.log('Error de conexión:', error);
    }
  }

  const hayUsuarioAutenticado = computed(() => {
    return nombre.value !== null;
  });

  function getUsuario() {
    return {
      id: id.value,
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      mail: mail.value,
      listaPlatos : listaPlatos.value
    };
  }

  async function guardarListaPlatos(carrito){
    //Almacena solo en el store
    listaPlatos.value = carrito;

    //Almacena en la API:
    const url = 'https://650dfa08a8b42265ec2ce076.mockapi.io/users';
    // const url = 'https://649141342f2c7ee6c2c7e399.mockapi.io/usuarios/users';
    
    try {
      //Creo la url para el usuario actual:
      const urlUsuario = url + '/' + String(this.id)
      //Para testeos-> console.log(urlUsuario)

      //Pido listaPlatos a la API:
      const response = await axios.get(urlUsuario);
      //Al array de la API le agrego la lista q esta en el store.
      const listaPlatosNueva = response.data.listaPlatos.concat(listaPlatos.value);

      //Subo la lista nueva a la API:
      const data = {listaPlatos: listaPlatosNueva}
      const responsePost = await axios.put(urlUsuario, data);
  
        if (responsePost.status === 200) {
          console.log('Platos registrados exitosamente');
        } else {
          alert('Error en la solicitud. Código de estado:', responsePost.status);
        }
      
    } catch (error) {
        console.log(error)
    }
  }

  function vaciarListaPlatos(){
    listaPlatos.value = null;
  }

  function getNomYAp() {
    return nombre.value + " " + apellido.value;
  }

  async function guardarHistorialListaPlatos(){
    const url = 'https://650dfa08a8b42265ec2ce076.mockapi.io/users';
    // const url = 'https://649141342f2c7ee6c2c7e399.mockapi.io/usuarios/users';
    const urlUsuario = url + '/' + String(this.id)

    //Llamo a la API
    const response = await axios.get(urlUsuario);

    //Devuelvo los platos q obtuve de la API.
    historialListaPlatos.value = response.data.listaPlatos;
  }

  function mostrarEstadisticas() {
    const usuarioAutenticado = hayUsuarioAutenticado;
    const usuarioMail = mail.value;
    return usuarioAutenticado && (usuarioMail === "admin@admin");
  }
    

  return { id, nombre, apellido, edad, mail, listaPlatos, historialListaPlatos, guardarListaPlatos, login, hayUsuarioAutenticado, getUsuario, registrarse, errorMessage, vaciarListaPlatos, getNomYAp, guardarHistorialListaPlatos, mostrarEstadisticas };
});
