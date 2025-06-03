const express = require('express');

const imagePathMiddleware = require('./middlewares/imagePath')

const app = express();

// importo il pacchetto cors
const cors = require('cors');

// importo dotenv
const dotenv = require('dotenv');
// utilizziamo la variabile dotenv richiamando il suo metodo confg()
dotenv.config();

const port = process.env.SERVER_PORT || 3000;

const movieRouter = require('./routers/movie');

app.use(express.static('public'));

// uso il middleware per il CORS
app.use(cors({ origin: process.env.FE_APP }));

app.use(imagePathMiddleware);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto su Movies Express!")
});

app.use("/movie", movieRouter);


app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`)
});