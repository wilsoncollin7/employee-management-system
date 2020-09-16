const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const prompt = require("./prompts");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dean",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    homePage();
});

function homePage() {
    inquirer.prompt(prompt.main)
    .then((answer) => {
      switch (answer.action) {
      case "View all employees":
        viewAllEmploy();
        break;
      case "View departments":
        viewDepart();
        break;
      case "View roles":
        viewRoles();
        break;
      case "Add employee":
        addEmployee();
        break;
      case "Add department":
        addDepartment();
        break;
      case "Add role":
        addRole();
        break;
      case "Update employee role":
        updateEmployRole();
        break;
      case "Exit":
        console.log("\n-----Goodbye!-----")
        connection.end();
        break;
      }
    });
};


const viewAllEmploy = function() {
    var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager `;
    query += `FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id`;

    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("-------------------------------------ALL EMPLOYEES-------------------------------------------");

        console.table(res);

        console.log("--------------------------------------------------------------------------------------------");

        homePage();
    })
};

const viewDepart = function() {
    var query = `SELECT * FROM department`;

    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("---------------------------------------DEPARTMENTS-------------------------------------------");

        console.table(res);

        console.log("--------------------------------------------------------------------------------------------");

        homePage();
    })
};

const viewRoles = function() {
    var query = `SELECT r.id, r.title, r.salary, d.name AS department FROM role r LEFT JOIN department d ON d.id = r.department_id`;

    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("-----------------------------------------ROLES-----------------------------------------------");

        console.table(res);

        console.log("--------------------------------------------------------------------------------------------");

        homePage();
    })
};

const addEmployee = function() {

    let departmentList = [];
    let roleList = [];
    let managerList = [];

    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            departmentList.push(`${item.id} ${item.name}`);
        })
    });
    connection.query(`SELECT id, title FROM role`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            roleList.push(`${item.id} ${item.title}`);
        })
    });
    connection.query(`SELECT id, first_name, last_name FROM employee`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            managerList.push(`${item.id} ${item.first_name} ${item.last_name}`);
        })
    });

    inquirer.prompt(prompt.addEmployee(departmentList, roleList, managerList))
    .then((answers) => {
        let role = parseInt(answers.role);
        let manager = parseInt(answers.manager);
        connection.query(
            "INSERT INTO employee SET ?", 
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: role,
                manager_id: manager
            },
            (err, res) => {
                if (err) throw err;
                console.log("--------------------------------------------------------------------------------------------");
                console.log(res.affectedRows + " employee added!");
                viewAllEmploy();
            }
        );
    });
};

const addDepartment = function() {
    inquirer.prompt(prompt.addDepartment)
    .then((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.department_name
            },
            (err, res) => {
                if (err) throw err;
                console.log("--------------------------------------------------------------------------------------------");
                console.log(res.affectedRows + " department added!");
                viewAllEmploy();
            }
        );
    });
};

const addRole = function() {

    let departmentList = [];

    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            departmentList.push(`${item.id} ${item.name}`);
        })
    });
    
    inquirer.prompt(prompt.addRole(departmentList))
    .then((answers) => {
        let department = parseInt(answers.role_department);
        connection.query(
            "INSERT INTO role SET ?", 
            {
                title: answers.role_title,
                salary: answers.role_salary,
                department_id: department
            },
            (err, res) => {
                if (err) throw err;
                console.log("--------------------------------------------------------------------------------------------");
                console.log(res.affectedRows + " role added!");
                viewAllEmploy();          
            }
        );
    });
};

const updateEmployRole = function() {

    let employeeList = [];
    let roleList = [];

    connection.query(`SELECT id, first_name, last_name FROM employee`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            employeeList.push(`${item.id} ${item.first_name} ${item.last_name}`);
        })
    });
    connection.query(`SELECT id, title FROM role`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            roleList.push(`${item.id} ${item.title}`);
        })
    });

    inquirer.prompt(prompt.updateEmployeeRole(employeeList, roleList))
    .then((answers) => {
        let role = parseInt(answers.new_role);
        let employee = parseInt(answers.employee_pick);
        connection.query(`UPDATE employee SET role_id = ${role} WHERE id = ${employee}`), (err, res) => {
            if (err) throw err;
            console.log("--------------------------------------------------------------------------------------------");
            console.log(res.affectedRows + " role updated!");
            viewAllEmploy();
        }
    });
};
