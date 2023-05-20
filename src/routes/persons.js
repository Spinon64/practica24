const express = require("express");  //inyectamos dependencia de express
const router = express.Router();  //creamos el router
const mongoose = require("mongoose");  //inyectamos dependencia de mongoose
let Person = require("../models/persons");  //variable para guardar lo que se exporta del archivo persons de la carpeta models

router.get("/gente",async (req, res) => {  // usamos router.get para renderizar la vista de index
    const Persons = await Person.find({});
    res.render("index", {Persons});
});

router.get("/addperson", (req,res) => {  //usamos router.get para renderizar la vista de "addPerson"
    res.render("addperson");
});

router.get("/findById/:id", (req,res) => {  //ruta para encontrar a personas por su id, si la encuenta renderizara el archivo de updatePerson
    Person.findById(req.params.id)
    .then((person) => {res.render("updatePerson", {person})})
    .catch((error) => {res.json({message:error})});
});

router.post("/addperson", function (req, res) {  //usamos router.post para agregar los datos que se envien para agregarlos en la tabla de la ruta /addPerson
    const newPerson = Person ({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    });

    newPerson
    .save()
    .then((data) =>{res.redirect("/gente")})
    .catch((error) => {res.json({message:error})});
})

router.post("/updatePerson", (req,res) => {  //usamos router.post para /personUpdate y buscar a la persona por id para poder editar la informacion mostrada
    Person.findByIdAndUpdate(req.body.objId,
        {
            nombre: req.body.nombre,
            edad: req.body.edad,
            tipoSangre: req.body.tipoSangre,
            nss: req.body.nss
        })
    .then((data) => {res.redirect("/gente")})
    .catch((error) => {res.json(({message:error}))});
})

router.post("/find",(req,res)=>{
    Person.find({nombre:{ $regex: req.body.criteria, $options: "i"}})
    .then((Persons)=>{res.render("index",{Persons})})
    .catch((error)=>{res.json({message:error})});
});

router.get('/deletePerson/:id', (req, res) => {

    Person.findByIdAndDelete(req.params.id)
    .then(()=>{res.redirect('/gente')})
    .catch((error)=>{res.json({message:error})});
});

module.exports = router; //Exportamos el modulo