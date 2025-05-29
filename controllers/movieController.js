const connection = require('../data/db');

// metodo index del controller
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, results) => {
        if(err) return res.status(500).json({error: "Database query failed: "+err});
      
        res.json(results);
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
    `;

    // query per recuperare le recensioni del film selezionato
    const reviewSql =`
        SELECT *
        FROM reviews
        WHERE movie_id = ?
    `;

    // eseguo la prima query
    connection.query(movieSql, [id], (err, moviesResult) => {
        if(err) {
            return res.status(500).json({error: "Database query failed: "+err})
        };

        // controllo se il film esiste
        if(moviesResult.length === 0) return res.status(404).json({error: "Movie not found"});

        // recupero il film in posizione 0
        const movie = moviesResult[0];

        // eseguo la seconda query
        connection.query(reviewSql, [id], (err, reviewResult) => {
            if(err) {
                return res.status(500).json({error: "Database query failed: "+err})
            };

            movie.reviews = reviewResult;

            res.json(movie);
        });
    });
};


module.exports = {
    index, show
};