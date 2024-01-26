# Apliocacion web - Vue.Js

Aplicación realizada con Vue.Js que permite la creación y login de Usuario, con recorrido de Menú de Comidas, Carga de pedidos a un Carrito de Compras, Confirmación de la compra con simulación de pago e Historial de pedidos para cada Usuario. 

### Lista de los requerimientos técnicos
**Componente de inicio:** 
  - Componente inicio que muestra información general: nombre del restaurante, dirección y número de teléfono.
  - Permitir a los usuarios ver, en la barra de navegación, las páginas a las que puede acceder según su rol(definido en la sección login).

**Con login de usuario:** Se podrá recorrer el menú de platos e ir cargando los pedidos a un "carrito de compras". Finalizada la selección, se podrá ir a la sección de pagos.

**Login:**
  - Creación de usuario
  - Logear a usuario ya creado
  - Usuarios no logueados pueden acceder solo a: Menú (pero se requiere estar logueado para realizar un pedido), index y login.
  - Roles: El usuario admin/gerente (creado por nosotros por lo que sabemos su mail y contraseña) es el único usuario que puede acceder a la página de informes/estadísticas.

**Menú y Pedidos:** 
  - Menú completo del restaurante, platos disponibles con sus descripciones y precios
  - Permitir agregar platos al carrito de compras
  - Carrito: Muestra todo lo que se agregó al carrito y permitirá tanto confirmar la compra (confirmación del pedido) como cancelar el pedido, que limpiara todo el carrito.
  - Confirmación del pedido: Una vez confirmado el pedido se redireccionará al usuario a la pantalla de pago.

**Carrito y Pago:** 
  - Componente de pagos de los clientes.
  - Calcular el total de la orden.
  - Confirmación: Simula una transacción una vez que el usuario confirme.
  - Enviar una confirmación del pedido al usuario después del pago.
  - Cancelar: Si el usuario se arrepiente debería presionar en "Cancelar" que lo llevará de nuevo al menú de platos.

**Informes:**
Log de acciones: estadísticas del restaurante , ingresos , platos más vendidos.
  - Permisos solo para el Usuario Admin.

**Historial:**
  - Permisos solo para el Usuario logueado.
  - Muestra historial de pedidos realizado.


---

<div align="center">
<img src="https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" />

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />

<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />

<img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" />

<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white" />

<img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />

</div
  
---


## Ejemplo de usuarios:

> Usuario 1: Mail: user1@user1 - Contraseña: contra1

> Usuario 2: Mail: user2@user2 - Contraseña: contra2

> Usuario 3: Mail: user3@user3 - Contraseña: contra3

> Usuario 4: Mail: user4@user4 - Contraseña: contra4

> Usuario 5: Mail: user5@user5 - Contraseña: contra5

> Usuario Administrador: Mail: admin@admin - Contraseña: contraadmin

### Ejemplo componente inicio:
![Inicio](https://github.com/martinLisi82ORT/Proyecto_PagPedidosRestaurante/assets/111402719/8d9a6a47-f235-4a0f-8584-78c097537dff)

### Ejemplo Menú y Pedidos:
![Menu](https://github.com/martinLisi82ORT/Proyecto_PagPedidosRestaurante/assets/111402719/ebc3bc81-9815-4e66-b383-2983509c0375)

### Ejemplo Login:
![Login](https://github.com/martinLisi82ORT/Proyecto_PagPedidosRestaurante/assets/111402719/4d7f57e3-adb2-4d89-a4f9-a6a26b550d59)

### Ejemplo componente Pago:
![Pago](https://github.com/martinLisi82ORT/Proyecto_PagPedidosRestaurante/assets/111402719/0e2030bc-c061-4a63-b081-cdc230c2c515)

