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
            validate: (value) => {
                if (value === "" || value === null) {
                    return "Salary cannot be empty."
                } else {
                    return true;
                }
            }
        },
        {
            type: "list",
            name: "role_department",
            message: "What is the roles DEPARTMENT?",
            choices: departmentList
        }
    ]

};