let mysql = require ('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kafe',
});
connection.connect(function(error){
    if(!!error){
        console.log(error)
    }else{
        console.log('Connection Succes')
    }
})

module.exports = connection;