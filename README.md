Programas Necesarios para correr la aplicacion:

node js ultima version

npm ultima version

SQL server version 2019

Debe habilitar los protolos TCP/IP para SQL server 2019

Debe configurar un usuario y una contraseña para iniciar sql por medio de (autentificacion de SQL server) y no de (autentificacion de Windows)

ese usuario y contraseñas configurados anteriormente deben ser colocados en el archivo server>db>dbconfig.js

Para inicializar la aplicacion:

--------------------------CLIENT------------------------

Para el cliente es necesario Ejecutar los siguientes comandos en la ruta 
client:

-npm install
para crear los node modules con las dependencias necesarias para el proyecto del lado del cliente

-npm start
para inicializar la app del lado del cliente

--------------------------SERVER------------------------

Para el servidor es necesario Ejecutar los siguientes comandos en la ruta 
server:

-npm install
para crear los node modules con las dependencias necesarias para el proyecto del lado del servidor

-npm run devStart
para inicializar la app del lado del servidor con nodemon que es una de las dependencias intaladas.


------------------------------BASE DE DATOS------------------------

La base de datos fue creada en SQL Server
y solo bastaria con restaurar el archivo .bak que se encuentra en la carpeta principal, ademas de esto hay que editar el archivo de la coneccion del servidor para que pueda conectarse con la base de datos en la ruta server>db
el archivo dbconfig.js
cambiarle server, password, user, dependiendo las propiedades de su motor de base de datos
