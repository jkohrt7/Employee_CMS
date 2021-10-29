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
            choices: employee_names
        },
        {
            type: "list",
            message: "Which role would you like the employee to have?",
            name: "employee_role",
            choices: employee_roles 
        }
    ])
}

function createDepartmentPrompt(departmentList) {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "department",
            validate: (input) => {
                if(departmentList.includes(input)) {
                    return "That department already exists.";
                }
                return true;
            }
        }
    ])
}

function createRolePrompt(roleList,deptList) {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "title",
            validate: (input) =>  {
                if(roleList.includes(input)) {
                    return "That role already exists.";
                }
                return true;
            }
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary",
            validate: (input) => {
                let num = Number(input);
                if (isNaN(num)) {
                    return "Please only use numeric characters."
                }
                else if(num >= 1000000000) {
                    return "That's a bit much for a salary! Please enter a value under one billion."
                }
                return true;
            }
        },
        {
            type: "list",
            message: "What department is this role a part of?",
            name: "department_name",
            choices: deptList
        }
    ])
}

module.exports = {
    "selectOperationPrompt": selectOperationPrompt,
    "addEmployeePrompt": addEmployeePrompt,
    "createDepartmentPrompt": createDepartmentPrompt,
    "createRolePrompt": createRolePrompt,
    "updateEmployeeRolePrompt": updateEmployeeRolePrompt
}