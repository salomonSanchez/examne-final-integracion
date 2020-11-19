const modelos = require('../database/dbconf')
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('welcome alumnos v1:  visit /listar/alumnos ')
})

router.get('/listar/alumnos', async(request, response) => {
    try {
        var result = await modelos.Model.find().exec();
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/registrar/alumnos", async(request, response) => {
    try {
        var alumnos = new modelos.Model(request.body);
        var result = await alumnos.save();
        response.status(200).json(result)
    } catch (error) {
        response.status(500).send("Error al guardar registro: " + error);
    }
});

router.get('/listar/alumno/:id', async(request, response) => {
    try {
        var result = await modelos.Model.find({ cod_alumno: request.params.id }).exec();
        response.status(200).json(result)
        if (result.length !== 0)
            sendKafka(result)
        else
            sendKafka(result)

    } catch (error) {
        response.status(500).send(error);
    }
});



module.exports = router;