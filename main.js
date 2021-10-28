
const mysql = require('mysql2/promise');
const EmployeeList = require('./lib/EmployeeList')
const inquirer = require('inquirer');
const prompts = require('./lib/prompts');




async function init() {
    
    //connect to db
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'asecurepassword',
        database: 'employee_db'
    })

    //Use it to create an object with sql methods
    let empDb = new EmployeeList(db);

    //Keep asking the user for info until they quit
    var finished = false;
    while(!finished) {
        let choice = await prompts.selectOperationPrompt();
        choice = choice["operation"];

        //to avoid repeat declarations
        let results; 
        let roles;
        let names;
        let e;

        switch (choice) {
            case 'View All Employees':
                await empDb.showAllEmployees();
                break;

            case 'Add Employee':
                roles = await empDb.getAllRoleTitles();
                names = await empDb.getAllEmployeeNames();
                e = await prompts.addEmployeePrompt(roles, names);
                await empDb.addEmployee(e);
                break;

            case 'Update Employee Role' :
                roles = await empDb.getAllRoleTitles();
                names = await empDb.getAllEmployeeNames();
                e = await prompts.updateEmployeeRolePrompt(names, roles);
                await empDb.updateRole(e);
                break;

            case 'View All Roles' :
                results = await empDb.showAllRoles();  //FINISHED
                break;

            case 'Add Role' :
                results = await prompts.createRolePrompt(); //TODO
                break;

            case 'View All Departments' :
                await empDb.showAllDepartments(); //FINISHED
                break;
                
            case 'Add Department' :
                results = await prompts.createDepartmentPrompt(); //TODO
                break; 

            case 'Quit' :
                finished = true; //FINISHED
                break;
        }
    }
    
    //sever the connection to the db
    console.log("Quitting...")
    db.end();
}

async function test() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'asecurepassword',
        database: 'employee_db'
    })

    let empDb = new EmployeeList(db);
    empDb.showAllEmployees();
    let values = await empDb.getAllRoleTitles();
    console.log(values)
    db.end();
}

init();
//stest();
