const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const orden = require('./routes/orden_v1');


app.use('/api/v1', orden);
//app.use('/api/v2', asitencia_v2);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/api/v1`)

})