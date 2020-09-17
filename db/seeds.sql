
-- -----SEEDS TO START UP DATABASE-----

-- department seeds
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("Finace");
INSERT INTO department (name) VALUES ("Legal");

-- role seeds
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("HR Representative", 60000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 125000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 190000, 5);

-- employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Billy", "Bob", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Smith", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Brown", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jessica", "Allen", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tommy", "Chan", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sam", "Stacey", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rebecca", "Tucker", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ronald", "Winchester", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Arthur", "Morgan", 8, 9);