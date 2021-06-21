const db = require('./DataBase');
const inquirer = require('inquirer')
require('console.table')
console.log("++++++++++++++++++++++")
console.log(db)
console.log("++++++++++++++++++++++")


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
        })
}

function Init() {
    StartPrompts()
}

Init()