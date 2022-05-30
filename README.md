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
