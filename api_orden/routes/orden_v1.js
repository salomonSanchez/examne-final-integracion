const modelos = require('../database/dbconf')
const express = require('express');
const router = express.Router();
var producer = require('../services/kafkaproducer')

router.get('/', (req, res) => {
    res.send('welcome pedidos v1:  visit /listar/ordenes ')
})

router.get('/listar/ordenes', async(request, response) => {
    try {
        var result = await modelos.Model.find().exec();
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/registrar/ordenes", async(request, response) => {
    try {
        var data = new modelos.Model(request.body);
        var result = await data.save();
        response.status(200).send(result);
        sendKafka(result)
    } catch (error) {
        response.status(500).send("Error al guardar registro: " + error);
    }
});

router.get('/listar/orden/:id', async(request, response) => {
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

function sendKafka(item) {
    try {
        payload = [{ topic: 'orden', messages: JSON.stringify(item) }]

        producer.send(payload, function(error, result) {
            if (error) { throw error }
            console.log("kafka: ", result)
        })
    } catch (error) {
        throw error
    }
}


module.exports = router;