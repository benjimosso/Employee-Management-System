const db = require('./DataBase');
const inquirer = require('inquirer')
require('console.table')



const StartPrompts = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager ',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager'
            ],
        }).then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    FindEmloyees()
                    break;

                case 'View All Employees by Department':
                    ByDepartment()
                    break;

                case 'View All Employees by Manager ':
                    ByManager()
                    break;

                case 'Add Employee':
                    AddEmployee()
                    break;

                case 'Remove Employee':
                    RemoveEmployee()
                    break;

                case 'Update Employee Role':
                    UpdateRole()
                    break;

                case 'Update Employee Manager':
                    UpdateManager()
                    break;

            }
        })
}

function FindEmloyees() {
    db.TodosEmployees()
        .then(([rows]) => {
            let result = rows
            console.table(result)
        })
        .then(() => StartPrompts())
}

function ByDepartment() {
    inquirer
        .prompt([{
            name: 'department',
            type: 'rawlist',
            message: 'Chose the department you want to see employees from.',
            choices: [
                'Human Resources',
                'Finance',
                'IT',
                'Engineering'
            ]

        }])
        .then((answer) => {
            db.PorDepartment(answer.department)
                .then(([rows]) => {
                    let result = rows;
                    console.table(result)
                })
                .then(() => StartPrompts())
        })
}

function AddEmployee() {
    inquirer
        .prompt([{
                name: "first_name",
                message: "What's the employee's first name?"
            },
            {
                name: "last_name",
                message: "What's the employee's last name?"
            }
        ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.allRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    inquirer
                        .prompt({
                            type: "list",
                            name: "roleId",
                            message: "What's the employee's role?",
                            choices: roleChoices
                        })
                        .then(res => {
                            let roleId = res.roleId;

                            db.TodosEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });
                                    inquirer
                                        .prompt({
                                            type: "list",
                                            name: "managerId",
                                            message: "Who's the employee's manager?",
                                            choices: managerChoices
                                        })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.addEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `Added ${firstName} ${lastName} to the database`
                                        ))
                                        .then(() => StartPrompts())
                                })
                        })
                })
        })
}


function UpdateRole() {
    db.TodosEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            inquirer
                .prompt([{
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.allRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));
                            inquirer
                                .prompt([{
                                    type: "list",
                                    name: "roleId",
                                    message: "What's the new role of this employee?",
                                    choices: roleChoices
                                }])
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("Employee's role is updated"))
                                .then(() => StartPrompts())
                        });
                });
        })
}

function Init() {
    StartPrompts()
}

Init()