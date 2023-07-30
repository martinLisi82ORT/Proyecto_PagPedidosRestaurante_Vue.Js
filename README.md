# PNT2-20231C-GRUPO5-ProyectoFinal
Idea elegida: Gestión de Deliverys de Restaurante.

               Nombre de la app = Resto Vue Pedidos.
              
# Lista de los requerimientos técnicos
Ej: Si mi idea es sobre películas un requerimiento será “Armar componente para visualizar película”. Otro será “Obtener las películas”

Login :
  - creación de usuario
  - logear a usuario ya creado
  - Usuarios no logueados pueden acceder solo a: Menú (pero se requiere estar logueado para realizar un pedido), index y login.
  - Roles: El usuario admin/gerente (creado por nosotros por lo que sabemos su mail y contraseña) es el unico usuario que puede acceder a la pagina de informes/estadísticas.

Componente de inicio : 
  - Componente inicio que muestre información general: nombre del restaurante, dirección y número de teléfono.
  - Permitir a los usuarios ver, en la barra de navegación, las páginas a las que puede acceder según su rol(definido en la sección login).

Menú y Pedidos : 
  - Menú completo del restaurante, platos disponibles con sus descripciones y precios
  - Permitir agregar platos al carrito de compras
  - Carrito: Muestra todo lo que se agrego al carrito y permitirá tanto confirmar la compra (confirmación del pedido) como cancelar el pedido, que limpiara todo el carrito.
  - Confirmación del pedido: Una vez confirmado el pedido se redireccionará al usuario a la pantalla de pago.

Carrito y Pago : 
  - Componente de pagos de los clientes 
  - Calcular total de la orden
  - Confirmación: Simular una transacción una vez que el usuario confirme
  - Enviar una confirmación del pedido al usuario después del pago
  - Cancelar: Si el usuario se arrepiente debería presionar en cancelar que lo llevaría de nuevo al menú (donde se ven los platos, no confundir con el menu principal de la aplicación).

Informes :<br />
Log de acciones : estadísticas del restaurante , ingresos , platos más vendidos. Componente AppEstadisticas.vue
  - Permisos = solo el Usuario Admin
  - Calendario/tabla de platos mas pedidos por dia de la semana: Habria q ver como se haria esta funcionalidad.
      - OPCION -> agregar atributo FECHA a los Platos del Historial.Herramienta que puede servir: https://date-fns.org/

Historial :<br />
Componente: AppHistorial.vue
  - para mostrar un historial de los pedidos que hizo.
  - Mostrar-> plato: con precio y FECHA del pedido.

# Bocetos
Realizamos un boceto muy general con Figma para conocer en forma aproximada como quedaria nuestra app.

## Herramienta usada:
Figma

## Link al archivo boceto:
https://www.figma.com/file/dAbX9JxRnnP4kLCI1lVFPH/TP_PNT2?type=design&node-id=0%3A1&mode=design&t=oGXkmNEcvX6eL5QE-1

### Ejemplo componente inicio
![Sin título](https://github.com/martinLisi82ORT/Proyecto_PagPedidosRestaurante/assets/111402719/d5143b72-40b8-4c76-b448-77787d02755a)

### Ejemplo Menú y Pedidos
![image](https://github.com/SimonF4/PNT2-20231C-GRUPO5-ProyectoFinal/assets/111466956/a0e4179c-bdfc-4282-b091-3c5bf9ed3152)

### Ejemplo Login
![image](https://github.com/SimonF4/PNT2-20231C-GRUPO5-ProyectoFinal/assets/111466956/a841e028-1c48-4545-ab5f-1331f1a994e6)
