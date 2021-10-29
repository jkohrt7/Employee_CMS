const inquirer = require('inquirer');
//TODO: import SQL commands

function selectOperationPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "operation",
            loop: false,
            choices: [
                "View All Employees", 
                "View All Roles", 
                "View All Departments", 
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role",            
                "Delete Employee",
                "Delete Role",
                "Delete Department",
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
            name: "title",
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

function deleteEmployeePrompt(employeeList) {
    return inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to delete?",
            name: "employee_name",
            choices: employeeList
        }
    ])
}

function deleteRolePrompt(roleList) {
    return inquirer.prompt([
        {
            type: "list",
            message: "Which role would you like to delete?",
            name: "title",
            choices: roleList
        }
    ])
}

function deleteDeptPrompt(deptList) {
    return inquirer.prompt([
        {
            type: "list",
            message: "Which department would you like to delete?",
            name: "title",
            choices: deptList
        }
    ])
}

module.exports = {
    "selectOperationPrompt": selectOperationPrompt,
    "addEmployeePrompt": addEmployeePrompt,
    "createDepartmentPrompt": createDepartmentPrompt,
    "createRolePrompt": createRolePrompt,
    "updateEmployeeRolePrompt": updateEmployeeRolePrompt,
    "deleteEmployeePrompt": deleteEmployeePrompt,
    "deleteRolePrompt": deleteRolePrompt,
    "deleteDeptPrompt": deleteDeptPrompt
}