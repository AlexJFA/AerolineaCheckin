const mysql = require("mysql");

const DB = {
  Motor: "MySQL",
  Host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  Usuario: "bsale_test",
  Contraseña: " bsale_test",
  "Nombre db": "airline",
};

const mysqlConection = mysql.createConnection(DB);

mysqlConection.connect((error, result) => {
  if(error) return console.log('error connection to the DB', error);
  
  return console.log("successful connection to the DB" , result);
});

module.exports = mysqlConection;
