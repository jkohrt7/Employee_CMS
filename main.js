
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

    //Keep looping to the main menu until user selects 'Quit'
    var finished = false;
    while(!finished) {
        let choice = await prompts.selectOperationPrompt();
        choice = choice["operation"];

        //to avoid repeat declarations
        let results; 
        let roles;
        let names;
        let e;

        //Menu choices
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
                results = await empDb.showAllRoles(); 
                break;

            case 'Add Role' :
                roles = await empDb.getAllRoleTitles();
                departments = await empDb.getAllDepartmentTitles();
                let newRole =  await prompts.createRolePrompt(roles,departments);
                await empDb.addRole(newRole);
                break;

            case 'View All Departments' :
                await empDb.showAllDepartments();
                break;
                
            case 'Add Department' :
                departments = await empDb.getAllDepartmentTitles();
                let newDept = await prompts.createDepartmentPrompt(departments); //TODO
                await empDb.addDepartment(newDept);
                break; 

            case 'Delete Employee' :
                names = await empDb.getAllEmployeeNames();
                e = await prompts.deleteEmployeePrompt(names);
                await empDb.deleteEmployee(e);
                break;

            case 'Delete Role' :
                roles = await empDb.getAllRoleTitles();
                let roleToDelete = await prompts.deleteRolePrompt(roles);
                await empDb.deleteRole(roleToDelete);
                break;

            case 'Delete Department' :
                departments = await empDb.getAllDepartmentTitles();
                let deptToDelete = await prompts.deleteRolePrompt(departments);
                await empDb.deleteDept(deptToDelete);
                break;

            case 'Quit' :
                finished = true; //FINISHED
                break;
        }
    }
    
    //sever the connection to the db once user quits
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
