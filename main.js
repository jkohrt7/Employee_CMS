
const mysql = require('mysql2');
const EmployeeList = require('./lib/EmployeeList')
const inquirer = require('inquirer');
const prompts = require('./lib/prompts');

//connect to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asecurepassword',
    database: 'employee_db'
})


async function init() {
    let empDb = new EmployeeList(db);

    //keep returning to start after each entry
    var finished = false;
    while(!finished) {
        let choice = await prompts.selectOperationPrompt();
        choice = choice["operation"];

        switch (choice) {
            case 'View All Employees':
                empDb.showAllEmployees();
                break;
            case 'Add Employee':
                let e = await prompts.addEmployeePrompt();
                //empDb.addEmployee(e.employee_fname,e.employee_lname, e.employee_role, e.manager_id);
                break;
            case 'Update Employee Role' :
                break;
            case 'View All Roles' :
                break;
            case 'Add Department' :
                break;
            case 'Quit' :
                finished = true;
                break;
        }
    }
    
    //sever the connection to the db
    console.log("Quitting...")
    db.end();
}

init();
