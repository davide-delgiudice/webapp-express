const connection = require('../data/db');

// metodo index del controller
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, moviesResult) => {
        if(err) return res.status(500).json({error: "Database query failed: "+err});
      
        res.json(moviesResult);
    })
};


// metodo show del controller
const show = (req, res) => {
    console.log('la mia show')
};

module.exports = {
    index, show
};