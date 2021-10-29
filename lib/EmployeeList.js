const Table = require('easy-table');
const util = require('util');

class EmployeeList {
    constructor(db) {
    //load the sql database
        this.db = db;
    }

    //prints the entire employee list to the console
    async showAllEmployees() {
        let result = await this.db.query(`
            SELECT e.id, e.first_name AS 'First_Name', e.last_name AS 'Last_Name', r.title AS 'Role', d.title AS 'Department', r.salary AS 'Salary', CONCAT(m.first_name, " ", m.last_name) AS 'Manager' 
            FROM employees AS e
            INNER JOIN employee_roles AS r ON r.id = e.role_id
            INNER JOIN departments AS d ON d.id = r.department_id
            LEFT JOIN employees AS m ON m.id=e.manager_id;
        `)
            
        //Create a table and print
        let data = result[0];

        let t = new Table;

        data.forEach((employee) => {
            t.cell('id', employee.id);
            t.cell('First Name', employee.First_Name);
            t.cell('Last Name', employee.Last_Name);
            t.cell('Role', employee.Role);
            t.cell('Manager', employee.Manager);
            t.newRow();
        })
        console.log('\n\n' + t.toString());
    }

    async getAllEmployeeNames() {
        let response = await this.db.query(`SELECT CONCAT(first_name, " ", last_name) FROM employees`);
        let responseArray = response[0];
        responseArray = responseArray.map((kvPair) => Object.values(kvPair)[0]); //just want values
        return responseArray;
    }

    //prints a list of all departments to the console
    async showAllDepartments() {
        let result = await this.db.query("SELECT id, title AS Name FROM departments"); 
        //print results to console
        let data = result[0];
        let t = new Table;

        data.forEach((department) => {
            t.cell('id', department.id);
            t.cell('Name', department.Name);
            t.newRow();
        })
        console.log('\n\n' + t.toString());
    }

    async getAllDepartmentTitles() {
        let response = await this.db.query(`SELECT title FROM departments`);
        let responseArray = response[0];
        responseArray = responseArray.map((kvPair) => Object.values(kvPair)[0]); //just want values
        return responseArray;
    }

    //prints a list of all roles to the console
    async showAllRoles() {
        let result = await this.db.query(`
            SELECT r.id, r.title, d.title AS department, r.salary 
            FROM employee_roles AS r
            INNER JOIN departments AS d ON d.id = r.department_id`)
         
            //print
            let data = result[0];
            let t = new Table;

            data.forEach((role) => {
                t.cell('id', role.id);
                t.cell('Title', role.title);
                t.cell('Department', role.department);
                t.cell('Salary', role.salary);
                t.newRow();
            })

            console.log('\n\n' + t.toString());
    }

    async getAllRoleTitles() {
        let response = await this.db.query(`SELECT title FROM employee_roles`);
        let responseArray = response[0];
        responseArray = responseArray.map((kvPair) => Object.values(kvPair)[0]); //just want values
        return responseArray;
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
    async addRole(newRole) {
        //get id for department
        let dept_id = await this.db.query(`SELECT id FROM departments WHERE title="${newRole.department_name}"`);
        dept_id = Object.values(dept_id[0][0])[0];

        //insert infomation into database
        await this.db.query(`
            INSERT INTO employee_roles(title,salary,department_id)
            VALUES ("${newRole.title}", ${newRole.salary}, ${dept_id})`)
            console.log(`>>> Role '${newRole.title}' added successfully. \n`);
        }

    async addEmployee(newEmployee) {
        //get id for manager
        let manager_id = await this.db.query(`SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name)="${newEmployee.employee_manager}"`);
        manager_id = Object.values(manager_id[0][0])[0];
        //get id for role
        let role_id = await this.db.query(`SELECT id FROM employee_roles WHERE title = "${newEmployee.employee_role}"`);
        role_id = Object.values(role_id[0][0])[0];

        await this.db.query(`
            INSERT INTO employees(first_name,last_name,role_id,manager_id) 
            VALUES ("${newEmployee.employee_fname}", "${newEmployee.employee_lname}", ${role_id}, ${manager_id})`);
        console.log(`>>> Employee ${newEmployee.employee_fname + " " + newEmployee.employee_lname} successfully added. \n`);
    }

    async updateRole(e) {
        let employee_id = await this.db.query(`SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name)="${e.employee_name}"`);
        employee_id = Object.values(employee_id[0][0])[0];

        let role_id = await this.db.query(`SELECT id FROM employee_roles WHERE title="${e.employee_role}"`);
        role_id = Object.values(role_id[0][0])[0];

        await this.db.query(`UPDATE employees SET role_id = ${role_id} WHERE id = ${employee_id}`);
        console.log(`>>> Role of ${e.employee_name} successfully changed to ${e.employee_role}. \n`);
    }
}

module.exports = EmployeeList;