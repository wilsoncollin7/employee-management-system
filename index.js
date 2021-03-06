const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
 
const prompt = require("./assets/prompts/prompts");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dean",
    database: "employees_db"
});


// -----MAIN CONNECTION-----

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log("--------------------------------------------------------------------------------------------");
    console.log(`        ######## ##     ## ########  ##        #######  ##    ## ######## ######## 
        ##       ###   ### ##     ## ##       ##     ##  ##  ##  ##       ##       
        ##       #### #### ##     ## ##       ##     ##   ####   ##       ##       
        ######   ## ### ## ########  ##       ##     ##    ##    ######   ######   
        ##       ##     ## ##        ##       ##     ##    ##    ##       ##       
        ##       ##     ## ##        ##       ##     ##    ##    ##       ##       
        ######## ##     ## ##        ########  #######     ##    ######## ######## 
        ##     ##    ###    ##    ##    ###     ######   ######## ########         
        ###   ###   ## ##   ###   ##   ## ##   ##    ##  ##       ##     ##        
        #### ####  ##   ##  ####  ##  ##   ##  ##        ##       ##     ##        
        ## ### ## ##     ## ## ## ## ##     ## ##   #### ######   ########         
        ##     ## ######### ##  #### ######### ##    ##  ##       ##   ##          
        ##     ## ##     ## ##   ### ##     ## ##    ##  ##       ##    ##         
        ##     ## ##     ## ##    ## ##     ##  ######   ######## ##     ##                        `);
    console.log("--------------------------------------------------------------------------------------------\n");
    homePage();
});

// -----HOMEPAGE FUNCTION DISPLAYS THE CHOICES-----

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
      case "Delete employee":
        deleteEmployee();
        break;
      case "Exit":
        console.log(`
          ------------------
        -------Goodbye!-------
          ------------------`)
        connection.end();
        break;
      }
    });
};

// -----VIEW ALL EMPLOYEES FUNCTION-----

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

// -----VIEW ALL DEPARTMENTS FUNCTION-----

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

// -----VIEW ALL ROLES FUNCTION-----

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

// -----ADD EMPLOYEE FUNCTION-----

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

// -----ADD DEPARTMENT FUNCTION-----

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

// -----ADD ROLE FUNCTION-----

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

// -----UPDATE EMPLOYEE ROLE FUNCTION-----

const updateEmployRole = function() {
    let emplyList = [];
    let roleList = [];
    connection.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            emplyList.push(`${item.id} ${item.first_name} ${item.last_name}`);
        })
    });
    connection.query(`SELECT id, title FROM role`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            roleList.push(`${item.id} ${item.title}`);
        })
    });
    inquirer.prompt(prompt.updateRole(emplyList, roleList))
    .then((answers) => {
        let role = parseInt(answers.new_role);
        let employee = parseInt(answers.employee_pick);
        connection.query(`UPDATE employee SET role_id = ${role} WHERE id = ${employee};`, (err, res) => {
            if (err) throw err;
            console.log("--------------------------------------------------------------------------------------------");
            console.log(res.affectedRows + " role updated!");
            viewAllEmploy();
        });
    });
};

// -----DELETE EMPLOYEE FUNCTION-----

const deleteEmployee = function() {
    let emplyList = [];
    connection.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        res.forEach((item) => {
            emplyList.push(`${item.id} ${item.first_name} ${item.last_name}`);
        })
    });
    inquirer.prompt(prompt.deletEmploy(emplyList))
    .then((answer) => {
        let employee = parseInt(answer.employee_pick);
        console.log("made it here")
        console.log(employee)
        connection.query(`DELETE FROM employee WHERE id = ${employee}`, (err, res) => {
            console.log("made it here 2")
            if (err) throw err;
            console.log("--------------------------------------------------------------------------------------------");
            console.log(res.affectedRows + " employee deleted!");
            viewAllEmploy();
        });
    })
}