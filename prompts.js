module.exports = {

    main: {
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View departments",
          "View roles",
          "Add employee",
          "Add department",
          "Add role",
          "Update employee role",
          "Exit"
        ]
    },

    addEmployee: (departmentList, roleList, managerList) => [
        {
            type: "input",
            name: "first_name",
            message: "What is the employees FIRST NAME?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "Employee first name cannot be empty."
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employees LAST NAME?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "Employee last name cannot be empty."
                } else {
                    return true;
                }
            }
        },
        {
            type: "list",
            name: "department",
            message: "What is the employees DEPARTMENT?",
            choices: departmentList
        },
        {
            type: "list",
            name: "role",
            message: "What is the employees ROLE?",
            choices: roleList
        },
        {
            type: "list",
            name: "manager",
            message: "Who's the employees MANAGER?",
            choices: managerList
        }
    ],

    addDepartment :
    {
        type: "input",
        name: "department_name",
        message: "What is the departments NAME?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Name cannot be empty."
            } else {
                return true;
            }
        }
    },

    addRole: (departmentList) => [
        {
            type: "input",
            name: "role_title",
            message: "What is the roles TITLE?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "Title cannot be empty."
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "role_salary",
            message: "What is the roles SALARY?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        },
        {
            type: "list",
            name: "role_department",
            message: "What is the roles DEPARTMENT?",
            choices: departmentList
        }
    ],

    updateRole: (employeeList, roleList) => [
        {
            type: "confirm",
            name: "confirm",
            messsage: "Do you want to update a emplpoyee?"
        },
        {
            type: "list",
            name: "employee_pick",
            message: "Choose an employee to update:",
            choices: employeeList
        },
        {
            type: "list",
            name: "new_role",
            message: "Choose new role",
            choices: roleList,
        }
    ]

};