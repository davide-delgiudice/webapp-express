const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

connection.connect((err) => {
    if(err) {
        comnsole.log(err)
    }
    else{
        console.log('Connect to MySQL')
    }
});

module.exports = connection;