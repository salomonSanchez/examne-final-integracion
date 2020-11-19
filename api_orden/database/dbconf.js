const mongoose = require('mongoose')
const uri = 'mongodb://root:secret@localhost:27017/pedidodb?authSource=admin';

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("‘MongoDB Connected…’") })
    .catch(err => console.log(err))


const Model = mongoose.model("pedidos", {
    nombre_cliente: { type: String, required: true },
    numero_mesa: { type: String, required: true },
    orden: { type: String, required: true },
    registro: { type: Date, default: Date.now }
});

module.exports = {
    Model
}