const express = require("express");  //inyectamos express
const mongoose = require("mongoose");  //inyectamos mongoose
const personsRoutes = require("./routes/persons")  //inyectamos el router de personas
require("dotenv").config();  //inyectamos la variable de ambiente para MONGODB_URI

mongoose.Promise = global.Promise;
const app = express();  //iniciamos aplicacion de express
const port = process.env.PORT || 3000;  //configuramos el puerto escucha


app.set ("view engine", "ejs");  //establecemos el valor para el motor de vistas
app.use (express.urlencoded({extended:false}));
app.use ("/assets", express.static(__dirname + "/../public"));  //utilizamos el router de personas

app.use(personsRoutes);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})  //conectamos a base de datos
.then(()=> console.log(`Conectado a TEST`))
.catch((error) => console.error(error));


app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));  //levantar servidor