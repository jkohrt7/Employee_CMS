const mysql = require('mysql2');

class EmployeeList {
    constructor(db) {
    //load the sql database
        this.db = db;
    }

    //prints the entire employee list
    showAllEmployees() {
        this.db.query("SELECT * FROM employees", (err, results) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        });
    }

    showAllDepartments() {
        this.db.query("SELECT * FROM departments", (err, results) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        });
    }

    showAllRoles() {
        this.db.query("SELECT * FROM employee_roles", (err, results) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }

    addDepartment(newDept) {
        this.db.query("SELECT * FROM employee_roles", (err, results) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }

    addRole(newRole) {
        this.db.query(`INSERT INTO employee_roles(title,salary,department_name) VALUES (${newRole.title, newRole.salary, newRole.department_name})`, 
        (err, results) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }

    addEmployee(newEmployee) {
        this.db.query(`INSERT INTO employees(first_name,last_name,role_id,manager_id) VALUES (${newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id})`, 
        (err, results) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }

    updateRole(employee_id, role_id) {
        this.db.query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`, 
        (err, results) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }
}