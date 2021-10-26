const Table = require('easy-table');

class EmployeeList {
    constructor(db) {
    //load the sql database
        this.db = db;
    }

    //prints the entire employee list to the console
    showAllEmployees() {
        this.db.query(`
            SELECT e.id, e.first_name AS 'First_Name', e.last_name AS 'Last_Name', r.title AS 'Role', d.title AS 'Department', r.salary AS 'Salary', CONCAT(m.first_name, " ", m.last_name) AS 'Manager' 
            FROM employees AS e
            INNER JOIN employee_roles AS r ON r.id = e.role_id
            INNER JOIN departments AS d ON d.id = r.department_id
            LEFT JOIN employees AS m ON m.id=e.manager_id;
        `,
         (err, result) => {
            if (err) {
                console.log(err);
            }
            
            //Create a table and print
            let data = result;

            let t = new Table;

            data.forEach((employee) => {
                t.cell('id', employee.id);
                t.cell('First Name', employee.First_Name);
                t.cell('Last Name', employee.Last_Name);
                t.cell('Role', employee.Role);
                t.cell('Manager', employee.Manager);
                t.newRow();
            })
            console.log(t.toString());
        });
    }

    //prints a list of all departments to the console
    showAllDepartments() {
        this.db.query("SELECT id, title AS Name FROM departments", (err, result) => {
            if (err) {
                console.log(err);
            }
            //print
            let data = result;

            let t = new Table;

            data.forEach((department) => {
                t.cell('id', department.id);
                t.cell('Name', department.Name);
                t.newRow();
            })
            console.log(t.toString());
        });
    }

    //prints a list of all roles to the console
    showAllRoles() {
        this.db.query(`
            SELECT r.id, r.title, d.title AS department, r.salary 
            FROM employee_roles AS r
            INNER JOIN departments AS d ON d.id = r.department_id`,
         (err, result) => {
            if (err) {
                console.log(err);
            }
            //print
            let data = result;
            let t = new Table;

            data.forEach((role) => {
                t.cell('id', role.id);
                t.cell('Title', role.title);
                t.cell('Department', role.department);
                t.cell('Salary', role.salary);
                t.newRow();
            })
            console.log(t.toString());
        });
    }

    //prints a list of all departments to the console
    addDepartment(newDept) {
        this.db.query("SELECT * FROM employee_roles", (err, result) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }

    //prints a list of all roles to the console
    addRole(newRole) {
        this.db.query(`INSERT INTO employee_roles(title,salary,department_name) VALUES (${newRole.title, newRole.salary, newRole.department_name})`, 
        (err, result) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }

    addEmployee(newEmployee) {
        this.db.query(`INSERT INTO employees(first_name,last_name,role_id,manager_id) VALUES (${newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id})`, 
        (err, result) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }

    updateRole(employee_id, role_id) {
        this.db.query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`, 
        (err, result) => {
            if (err) {
                console.log(err);
            }
              console.log(result);
        })
    }
}

module.exports = EmployeeList;