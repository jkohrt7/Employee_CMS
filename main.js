
const mysql = require('mysql2');
const EmployeeList = require('./lib/EmployeeList')
const inquirer = require('inquirer');

//connect to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asecurepassword',
    database: 'employee_db'
})

let empDb = new EmployeeList(db);
empDb.showAllEmployees();
//console.log(empDb.idToRoleString(1));

