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
            }
        })
}

const FindEmloyees = () => {
    console.log('Testeo de funcion.')
}

function Init() {
    StartPrompts()
}

Init()