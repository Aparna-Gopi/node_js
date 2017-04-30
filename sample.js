var mysql = require('mysql');

var Array = require('node-array');
var state_set = [];
var county_set = [];
var city_set = [];



var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '1234',
    database : 'geo'
});

connection.connect();


var file = require('./test.json');
for (var i = 0; i < file.length; i++) {

      if(state_set.indexOf(file[i].State)==-1){
        connection.query('insert into state (name) values ("'+file[i].State+'")');
        state_set.push(file[i].State);
      }

      if(county_set.indexOf(file[i].County)==-1)
      {
        connection.query('insert into county (name, state_id) values ("'+file[i].County+'", (select id from state where name="'+file[i].State+'"))');
        county_set.push(file[i].County);
      }

      if(city_set.indexOf(file[i].City)==-1){
        connection.query('insert into city (name, county_id) values ("'+file[i].City+'",(select id from county where name="'+file[i].County+'"))');
        city_set.push(file[i].City);
      }

     connection.query('insert into geo (latitude, longitude, zipcode, zipclass, city_id) values ("'+file[i].Latitude+'","'+file[i].Longitude+'","'+file[i].Zipcode+'","'+file[i].ZipClass+'",(select id from city where name="'+file[i].City+'"))');
    }
