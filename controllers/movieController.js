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
    const id = req.params.id;

    // query per recuperare il film con il rispettivo ID
    const movieSql = `
        SELECT *
        FROM movies
        WHERE id = ?
    `

    // eseguo la prima query
    connection.query(movieSql, [id], (err, moviesResult) => {
        if(err) {
            return res.status(500).json({error: "Database query failed: "+err});
        }

        // controllo se il film esiste
        if(moviesResult.length === 0) return res.status(404).json({error: "Movie not found"});
    })

};


module.exports = {
    index, show
};