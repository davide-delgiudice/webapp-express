const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto su Movies Express!")
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`)
});