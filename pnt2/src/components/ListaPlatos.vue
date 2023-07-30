<template>
  <div class="background-imagen">

    <div class="menu-container">
      <nav class="navbar navbar-fixed">
        <div class="navbar-sections-left navbar-sections-line">
          <div class="navbar-center">
            <select v-model="seleccionarSeccion" class="nav-select">
              <option value="" disabled>Seleccionar sección</option>
              <option v-for="section in menu" :value="section.category" :key="section.category">{{ section.category }}
              </option>
            </select>
            <button @click="navegarASeccion">Ir</button>
          </div>
        </div>
        <div class="navbar-sections-center navbar-sections-line">
          <h1 class="navbar-title navbar-title-center">Resto Vue Pedidos</h1>
        </div>
        <div class="navbar-sections-right navbar-sections-line">
          <button class="navbar-volver" @click="irAInicio()">Volver</button>
          <div class="navbar-cart" @click="mostrarModal = true">
            <p class="cart-count" :class="{ 'cart-count-highlight': carrito.length > 0 }">{{ carrito.length }}</p>
            <i class="fas fa-shopping-cart" :class="{ 'cart-highlight': carrito.length > 0 }"></i>
          </div>
        </div>
      </nav>
      <div v-if="mostrarModal" class="modal" @click.self="mostrarModal = false">
        <div class="modal-content">
          <span class="modal-close" @click="mostrarModal = false">&times;</span>
          <h2>Carrito</h2>
          <div v-if="carrito.length === 0">
            <p>No hay elementos en el carrito.</p>
          </div>
          <div v-else>
            <div v-for="item in carrito" :key="item.id">
              <p>{{ item.nombre }}</p>
              <p>Precio: {{ item.precio }}</p>
            </div>
            <p>Total: {{ calcularTotal() }}</p>
            <button @click="realizarPedido()">Realizar pedido</button>
            <button @click="cancelarPedido(); mostrarModal = false">Cancelar Pedido</button>
          </div>
        </div>
      </div>
      <div>
        <h1 class="menu-title">Menú</h1>
        <div class="menu-section" v-for="section in menu" :key="section.category" :class="{ desplegado: mostrarMenu }"
          :ref="section.category">
          <h2 class="menu-section-title">{{ section.category }}</h2>
          <div class="menu-item" v-for="plato in section.platos" :key="plato.id">
            <div class="menu-item-box">
              <div class="menu-item-image">
                <img :src="plato.imagen" alt="Imagen del plato" />
              </div>
              <div class="menu-item-details">
                <h3 class="menu-item-name">{{ plato.nombre }}</h3>
                <div class="menu-item-description">
                  <p>{{ plato.descripcion }}</p>
                </div>
                <p class="menu-item-price">Precio: {{ plato.precio }}</p>
                <button class="menu-item-add" @click="agregarAlCarrito(plato)">Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p>Dirección: Av. Falsa 1234</p>
      <p>Teléfono: 555-555</p>
    </footer>
  </div>
</template>

<style src="../styles/listaPlatosStyles.css" scoped></style>
<style src="../styles/appHistorialStyles.css" scoped></style>
<style src="../styles/inicioStyles.css" scoped></style>

<script>
import ceviche from '@/assets/cevichito.jpg';
import gramajo from '@/assets/Gramajo.jpg';
import empanada from '@/assets/empanadaciervo.jpg';
import pizza from '@/assets/pizza.jpg';
import caracu from '@/assets/caracu.jpg';
import tortilla from '@/assets/tortilla.jpg';
import causa from '@/assets/causa.jpg';
import nachos from '@/assets/nachos.jpg';
import flan from '@/assets/flanconcremaydulce.jpeg';
import milanesa from '@/assets/milanesa.jpeg';
import ratatuil from '@/assets/ratatuil.avif';
import fondue from '@/assets/fondue.jpg';
import smash from '@/assets/smashhamburguesa.webp';
import sushi from '@/assets/sushi.webp';
import paella from '@/assets/paella.webp';
import burrito from '@/assets/burrito.webp';
import chopsuey from '@/assets/chopsuey.webp';
import chocotorta from '@/assets/chocotorta.webp';
import alfajor from '@/assets/alfajor.webp';
import pastafrola from '@/assets/pastafrola.webp';
import rogel from '@/assets/rogel.webp';
import vigilante from '@/assets/vigilanete.jpg';
import conitos from '@/assets/conitos.jpg';
import budindepan from '@/assets/budindepan.jpeg';
import useAuthStore from '../stores/AuthStore'
//agregar funcionalidad de stock. (validar el maximo que pueda seguir segun el stock).
//agregar funcionalidad de historial (tablero de informacion.) (platos mas vendidos en el mes).
//No darle tanta bola al tema del pago , sino que sea algo funcional y que tira.
//tener un grafico tener con la semana y sumar la cantidad de productos por dia. 
//verificar el tema de la api.
//storming de ideas para destrabar ideas.

export default {
  data() {
    return {
      seleccionarSeccion: null,
      mostrarModal: false,
      carrito: [],
      menu: [
        {
          category: 'Entradas',
          platos: [
            {
              id: 1,
              nombre: 'CEVICHE CREMOSO',
              descripcion: 'Un plató típico de la gastronomía peruana. Propuesto como entrada, este ceviche lleva dados de salmón marinados en jugo de lima, crema de ají amarillo, chips y maíz frito. Por sus dimensiones es un plato que, si bien se sirve como entrada, podría perfectamente pasar por un principal',
              precio: 3500,
              disponible: true,
              imagen: ceviche
            },
            {
              id: 2,
              nombre: 'EL GRAMAJO',
              descripcion: 'Una receta que data de la época de la gran inmigración europea a la Argentina y que constituye un clásico de nuestra gastronomía. En Inmigrante, Leandro Di Mare le dio una vuelta de rosca, servido por separado, la idea es que el comensal lo mezcle a gusto. Lleva Jamón marinado y glaseado a la parrilla, huevo a baja temperatura con polvo de aceitunas negras, salteado de arvejas, cebolla encurtida y papas fritas a la provenzal.',
              precio: 1975,
              disponible: true,
              imagen: gramajo
            },
            {
              id: 3,
              nombre: 'EMPANADAS DE CIERVO',
              descripcion: 'Una de las entradas de la carta de mediodía que tranquilamente podría ser un plato principal, tanto por su elaboración como por su contundencia (obvio no pidiendo alguna, sino varias). La masa es casera y el relleno se prepara con carne de ciervo que fue braseado por muchas horas. Se sirve con una fresca ensalada de rabanitos y verdes, más una salsa de tomates con limón que potencia todos los sabores. Para los amantes del picante, puede acompañarse también con un picante de Cachi.',
              precio: 2000,
              disponible: true,
              imagen: empanada
            },
            {
              id: 4,
              nombre: 'PIZZA FRITA MARGHERITA',
              descripcion: 'Un plato típico de la cocina callejera napolitana, que aquí proponen como entrada en porciones individuales. La pizza frita Margherita sale con mozzarella, tomate y albahaca fresca y es una gran opción para probar una versión distinta de un plato clásico, También es contundente como entrada los Arancini con salsa Amatriciana; los llaman “Polpette di Riso” y constituyen un plato tradicional siciliano que por lo general se sirve como un aperitivo, previo a la comida, pero es realmente contundente. Se trata de unas albóndigas de arroz bien condimentadas que se sirven con una clásica salsa Amatriciana a base de tomates, guanciale (una especie de panceta italiana) y cebolla.',
              precio: 1950,
              disponible: true,
              imagen: pizza
            },
            {
              id: 5,
              nombre: 'CARACÚ CON MANDIOCA Y APIO DE LA CASA ',
              descripcion: 'Una tentadora preparación, inspirada en la clásica obra Adán Buenosayres de Leopoldo Marechal. Fusiona sabores autóctonos y texturas disímiles. Se compone por tuétano (caracú) en 3 cocciones, mandioca en 2 cocciones y un mix de hierbas frescas como hojas de perejil y apio, aliñadas con una vinagreta de sal, pimienta y tokarashi. Otra entrada power son los fideos de trigo sarraceno, shiso, y panceta.',
              precio: 2050,
              disponible: true,
              imagen: caracu
            },
            {
              id: 6,
              nombre: 'TORTILLA DE PAPA',
              descripcion: 'La Tortilla de papa «bien babé» se transformó en una clásico entre sus clientes habituales y se puede pedir con chorizo colorado.',
              precio: 1750,
              disponible: true,
              imagen: tortilla
            },
            {
              id: 7,
              nombre: 'NACHOS AL HORNO CON QUESO FUNDIDO, GUACAMOLE, FRIJOLES (Y SALSA HOT)',
              descripcion: 'Crocantes capas de Nachos al horno, con salsa de especial de tomates, queso fundido, cheddar y verdeo. Acompañados con guacamole, crema ácida, frijol refrito y salsa hot. Una bomba divina.',
              precio: 1500,
              disponible: true,
              imagen: nachos
            },
            {
              id: 8,
              nombre: 'LA CAUSA CHIRASHI DE OSAKA',
              descripcion: 'Tartar de pescados, mariscos, masago, palta y salsa acevichada. Muy rico, tipica fusion peruana-argentina ',
              precio: 2000,
              disponible: true,
              imagen: causa
            },
          ]
        },
        {
          category: 'Platos principales',
          platos: [
            {
              id: 9,
              nombre: 'Milanesa Con pure',
              descripcion: 'Milanesa de ternera con pure, clasico argentino que esta disponible en todas las casas.',
              precio: 2500,
              disponible: false,
              imagen: milanesa
            },
            {
              id: 10,
              nombre: 'Hamburguesa',
              descripcion: 'Como su nombre lo indica, es originaria de Hamburgo -Alemania-. La enorme migración germánica hacia los Estados Unidos hizo que las hamburguesas se volvieran cada vez más popular, hasta conocerse en el mundo entero: carne picada bien comprimida y en forma de disco que, generalmente, se sirve como sándwich. Se le agregan verduras y se acompaña con papas fritas.',
              precio: 1950,
              disponible: false,
              imagen: smash
            },
            {
              id: 11,
              nombre: 'Sushi',
              descripcion: 'Este tradicional plato de Japón despertó furor en las últimas décadas y alrededor de todo el globo terráqueo. Se prepara con arroz de grano redondo, que es envuelto en algas nori junto a diferentes ingredientes. Mayoritariamente, se tratan de pescados crudos acompañados con vegetales',
              precio: 2500,
              disponible: false,
              imagen: sushi
            },
            {
              id: 12,
              nombre: 'Paella',
              descripcion: 'Continuando con el arroz y los pescados, la paella es un clásico de España que ha sabido ganarse el aprecio internacional. Originaria de Valencia, debe su nombre a la gigante “paellera” dónde se cocina. Se trata de un buen plato de arroz y mariscos, condimentado con azafrán y hierbas verdes. Como siempre, hay muchas versiones y se hace también con pollo, cerdo o, simplemente, vegetales.',
              precio: 5000,
              disponible: false,
              imagen: paella
            },
            {
              id: 13,
              nombre: 'Fondue',
              descripcion: 'Cuando llega el invierno y las bajas temperaturas, ¿a quién no le apetece una rica y calentita fondue? Suiza nos regala esta exquisita preparación de queso fundido, acompañada por pedacitos de pan. Es común servirla con champiñones para sumergir en el queso y saborear. Y si te quedas con hambre, también puedes servir la fondue de chocolate como postre. En ese caso, se acompaña con frutas.',
              precio: 3500,
              disponible: false,
              imagen: fondue
            },
            {
              id: 14,
              nombre: 'Burrito',
              descripcion: 'Su exquisitez y practicidad les han permitido a los burritos consagrarse como otra de las comidas más populares del universo. Autóctono de México, contiene algunos de los ingredientes más representativos de su país: una tortilla tradicional, a la que se le agrega un relleno -generalmente carne, pollo y maíz- y luego se la enrolla para formar el famoso burrito.',
              precio: 1900,
              disponible: false,
              imagen: burrito
            },
            {
              id: 15,
              nombre: 'Chop Suey',
              descripcion: 'Nuevamente, la comida oriental se hace lugar en este listado tan pretencioso. Oriundo de la mística China, el chop suey no sólo ha ganado popularidad en Oriente sino también en muchas regiones de Occidente. El plato se compone de carne de cerdo o pollo, huevos y vegetales salteados, con salsa de soja. Para cocinar los ingredientes se utiliza un wok, una sartén grande y cóncava.',
              precio: 2000,
              disponible: false,
              imagen: chopsuey
            },
            {
              id: 16,
              nombre: 'Ratatouille',
              descripcion: 'Esta famosa especialidad proviene de la Provenza -región sureste de Francia- y es un guiso de tomates, ajos, cebolla, pimientos, berenjenas y calabacín, regados en aceite de oliva. Se condimenta con las llamadas hierbas provenzales, como tomillo, romero, orégano, laurel y albahaca. El ratatouille se sirve frío o caliente, generalmente como acompañamiento de carnes o pescados.',
              precio: 2500,
              disponible: false,
              imagen: ratatuil
            }
          ]
        },
        {
          category: 'Postres',
          platos: [
            {
              id: 17,
              nombre: 'Flancito',
              descripcion: 'Flan con crema y dulce de leche, tipico postre por excelencia, de los mas pedidos de la casa.',
              precio: 1000,
              disponible: true,
              imagen: flan
            },
            {
              id: 18,
              nombre: 'Chocotorta',
              descripcion: 'La chocotorta es otro de los postres típicos de Argentina que se ubican en el podio de los preferidos. Su sencillez para elaborarla y su delicioso sabor, hace que este “pastel” argentino sea el protagonista de todos los cumpleaños, reuniones o fiestas. Los peques nunca te dirán que no a una porción de chocotorta, y los adultos…tampoco.',
              precio: 1500,
              disponible: true,
              imagen: chocotorta
            },
            {
              id: 19,
              nombre: 'Vigilante',
              descripcion: '“Queso y dulce”, “fresco y batata” o vigilante, de cualquier forma que lo encuentres, debes saber que es uno de los postres típicos de Argentina que no te puedes perder.',
              precio: 1000,
              disponible: true,
              imagen: vigilante
            },
            {
              id: 20,
              nombre: 'Alfajores',
              descripcion: 'Los alfajores son otros de los postres típicos de Argentina por excelencia, ya que también fueron sus creadores. Se suele comer en el desayuno o por la tarde acompañado de un café, o como postre después de una comida.',
              precio: 750,
              disponible: true,
              imagen: alfajor
            },
            {
              id: 21,
              nombre: 'Pastafrola',
              descripcion: 'Es un pastel de masa quebrada relleno de mermelada de membrillo, que finaliza con la misma masa ubicada en tiras, haciendo un patrón de cuadrados.',
              precio: 1500,
              disponible: true,
              imagen: pastafrola
            },
            {
              id: 22,
              nombre: 'Budín de pan',
              descripcion: 'El pan se moja en leche, huevos, vainilla y azúcar. También puede contener especias como canela y nuez moscada y puede incluir limón o pasas.',
              precio: 1500,
              disponible: true,
              imagen: budindepan
            },
            {
              id: 23,
              nombre: 'Torta Rogel',
              descripcion: 'Rogel es un pastel que entra por los ojos y no defrauda. Se prepara con huevos, mantequilla, harina y, a veces, un poco de coñac para darle sabor.',
              precio: 1200,
              disponible: true,
              imagen: rogel
            },
            {
              id: 24,
              nombre: 'Conitos de dulce de leche',
              descripcion: 'Son, tal como su nombre lo indica, una base de galleta con mucho dulce de leche, bañado en chocolate con forma de cono.',
              precio: 1100,
              disponible: true,
              imagen: conitos
            }
          ]
        }
      ],
      mostrarMenu: true,
      mostrarCarrito: false,
      pedido: {
        platos: []
      },
    };
  },
  methods: {
    agregarAlCarrito(plato) {
      this.carrito.push(plato);
    },
    realizarPedido() {
      if (useAuthStore().hayUsuarioAutenticado) {
        useAuthStore().guardarListaPlatos(this.carrito);
        this.$router.push('/pagar');

        this.mostrarModal = false;
      } else {
        console.log('Error: El usuario no está autenticado');
        // Redirigir a la página de inicio de sesión
        this.$router.push('/login');
      }
    },

    calcularTotal() {
      return this.carrito.reduce((total, plato) => total + plato.precio, 0);
    },

    navegarASeccion() {
      if (this.seleccionarSeccion) {
        const seccionSeleccionada = this.$refs[this.seleccionarSeccion][0];
        if (seccionSeleccionada) {
          seccionSeleccionada.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },

    irAInicio() {
      this.$router.push('/');
      //Al salir de esta pagina se deberia vaciar el carrito
      this.cancelarPedido();
    },

    cancelarPedido() {
      //Vacia la lista del componente.
      this.carrito.length = 0;
    }
  }
};
</script>

