DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
	salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
	PRIMARY KEY (id)
);