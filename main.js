
const mysql = require('mysql2');
const inquirer = require('inquirer');

//connect to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asecurepassword'
})
