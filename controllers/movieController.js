const connection = require('../data/db');

const index = (req, res) => {
    console.log('la mia index')
};


const show = (req, res) => {
    console.log('la mia show')
};

module.exports = {
    index, show
};