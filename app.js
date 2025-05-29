const express = require('express');

const app = express();

// importo dotenv
const dotenv = require('dotenv');
// utilizziamo la variabile dotenv richiamando il suo metodo confg()
dotenv.config();

const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto su Movies Express!")
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`)
});