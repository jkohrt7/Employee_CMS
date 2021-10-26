INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES 
("George", "Shustermann", 1, 2),
("Amanda", "Allbright", 2, 3),
("George", "Lucas", 3, NULL);

INSERT INTO employee_roles(title,salary,department_id) VALUES
("Set Engineer", 50,1),
("CFO", 100,2),
("Director", 200,3);

INSERT INTO departments(title) VALUES
("Engineering"),
("Finance"),
("Executive");