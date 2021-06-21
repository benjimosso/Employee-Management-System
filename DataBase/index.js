const connection = require('./connection')


class Employee_DB {
    constructor(connection) {
        this.connection = connection;
    }

    TodosEmployees() {
        const query = 'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name  FROM employee INNER join role on (employee.role_id = role.id) join department on (department_id = department.id)';
        return this.connection.promise().query(query)
    }

    PorDepartment(answer) {

    }
}

module.exports = new Employee_DB(connection)