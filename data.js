var mysql = require('mysql');


var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '1234',
    database : 'geo'
});

connection.connect();

connection.query("SELECT name, COUNT(name) AS count FROM city_zipcode GROUP BY id ORDER BY count DESC LIMIT 1;",function(err, rows) {
  if (err) throw err;
  console.log("biggest city  is   "+ rows[0].name );
});
connection.query("SELECT name, COUNT(name) AS count FROM county_city GROUP BY id ORDER BY count DESC LIMIT 1;",function(err, rows) {
  if (err) throw err;
  console.log("biggest county is   "+ rows[0].name + "  with  " + rows[0].count + "   cities");

});

var readlineSync = require('readline-sync');

var zip = readlineSync.question('enter zip to find county');

connection.query("select county_name from city_details where zipcode=?",zip,function(err,rows)
{
    console.log("county  "+JSON.stringify(rows[0].county_name));
});




var city = readlineSync.question('enter');
console.log(city);
    connection.query('select name from city where name like %"'+city+'" ', function(err,rows)
    {
      console.log(JSON.stringify(rows));
    });
