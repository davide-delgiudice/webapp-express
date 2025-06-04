const connection = require('../data/db');

// metodo index del controller
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed: " + err });

        // ciclo l'array risultante per andare a sovrascrivere la proprietà image
        const movies = results.map((movieImage) => {
            const obj = {
                ...movieImage,
                image: req.imagePath + movieImage.image
            }

            return obj;
        });

        res.json(movies);
    })
};


// metodo show del controller
const show = (req, res) => {
    const id = req.params.id;

    // query per recuperare il film con il rispettivo ID
    const movieSql = `
        SELECT M.*, ROUND(AVG(R.vote)) AS average_vote
        FROM movies M
        JOIN reviews R ON R.movie_id = M.id
        WHERE M.id = ?
    `;

    // query per recuperare le recensioni del film selezionato
    const reviewSql = `
        SELECT *
        FROM reviews
        WHERE movie_id = ?
    `;

    // eseguo la prima query
    connection.query(movieSql, [id], (err, moviesResult) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed: " + err })
        };

        // controllo se il film esiste
        if (moviesResult.length === 0) return res.status(404).json({ error: "Movie not found" });

        // recupero il film in posizione 0
        const movie = moviesResult[0];

        movie.image = req.imagePath + movie.image;

        // eseguo la seconda query
        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) {
                return res.status(500).json({ error: "Database query failed: " + err })
            };

            // aggiungo le recensioni per il singolo libro
            movie.reviews = reviewResult;

            // aggiungo la media per il singolo libro
            movie.average_vote = parseInt(movie.average_vote);

            res.json(movie);
        });
    });
};

// definisco il metodo dello storeReview
const storeReview = (req, res) => {
    console.log("BODY:", req.body);
    // recupero il parametro id
    const { id } = req.params;

    // recupero i dati del body
    const { text, vote, name } = req.body;

    // preparo la query
    const newReviewSql =`
    INSERT 
    INTO reviews (text, vote, name, movie_id)
    VALUES(?,?,?,?)
    `;

    // eseguo la query per le nuove review
    connection.query(newReviewSql, [text, vote, name, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed: " + err});
        };

        res.status(201).json({ message: "Recensione aggiunta", id: result.insertId});
    })
};


module.exports = {
    index, show, storeReview
};