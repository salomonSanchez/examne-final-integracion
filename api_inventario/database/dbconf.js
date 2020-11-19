const mongoose = require('mongoose')
const uri = 'mongodb://root:secret@localhost:27017/alumnosdb?authSource=admin';

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("‘MongoDB Connected…’") })
    .catch(err => console.log(err))


const Model = mongoose.model("alumnos", {
    cod_alumno: { type: String, required: true },
    nombre: { type: String, required: true },
    dni: { type: String, required: true },
    registro: { type: Date, default: Date.now }
});

module.exports = {
    Model
}