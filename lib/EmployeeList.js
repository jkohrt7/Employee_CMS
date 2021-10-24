 
 class EmployeeList {
     constructor(db) {
        //load the sql database or some shit idk
        this.db = db;
     }

     //prints the entire employee list
     getFullEmployeeList() {
         return this.db.query("SELECT * FROM employees");
     }

     getAllDepartments() {
         return this.db.query("SELECT * FROM departments");
     }

     getAllRoles() {
         return this.db.query("SELECT * FROM employee_roles")
     }
 }