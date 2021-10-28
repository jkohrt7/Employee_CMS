const inquirer = require('inquirer');
//TODO: import SQL commands

function selectOperationPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "operation",
            choices: [
                "View All Employees", //doesn't require additional prompt
                "Add Employee",
                "Update Employee Role",
                "View All Roles", //doesn't require additional prompt
                "Add Role",
                "View All Departments", //doesn't require additional prompt
                "Add Department",
                "Quit"
            ]
        }
    ])
}

function addEmployeePrompt(employee_roles, employee_names) {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "employee_fname"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "employee_lname"
        },
        {
            type: "list",
            message: "What is the employee's role in the company?",
            name: "employee_role",
            choices: employee_roles 
        },
        {
            type: "list",
            message: "Who is this employee's manager?",
            name: "employee_manager",
            choices: employee_names 
        }
    ])
}

function updateEmployeeRolePrompt(employee_names, employee_roles) {
    return inquirer.prompt([
        {
            type: "list",
            message: "Which employee's role would you like to change?",
            name: "employee_name",
            choices: employee_names //todo
        },
        {
            type: "list",
            message: "Which role would you like the employee to have?",
            name: "employee_role",
            choices: employee_roles //todo
        }
    ])
}

function createDepartmentPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "department",
            validate: (input) => {
                //TODO: make sure it's not in the column already.
            }
        }
    ])
}

function createRolePrompt() {
    //TODO
}

module.exports = {
    "selectOperationPrompt": selectOperationPrompt,
    "addEmployeePrompt": addEmployeePrompt,
    "createDepartmentPrompt": createDepartmentPrompt,
    "createRolePrompt": createRolePrompt,
    "updateEmployeeRolePrompt": updateEmployeeRolePrompt
}