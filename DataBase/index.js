const { query } = require('./connection');
const connection = require('./connection')


class Employee_DB {
    constructor(connection) {
        this.connection = connection;
    }

    TodosEmployees() {
        const query = 'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department  FROM employee INNER join role on (employee.role_id = role.id) join department on (department_id = department.id)';
        return this.connection.promise().query(query)
    }

    PorDepartment(department) {
        const query = 'select employee.first_name, employee.last_name, role.title, department.department from employee, role, department where role.department_id = department.id and employee.role_id = role.id and department.department = ?'
        return this.connection.promise().query(query, department)
    }

    // allEmployees() {
    //     return this.connection.promise().query(
    //         "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    //     );
    // }

    addEmployee(employee) {
            return this.connection.promise().query("INSERT INTO employee SET ?", employee);
        }
        // Function in progress... 
    RemoveEmployee(employee) {
        return this.connection.promise().query("DELETE FROM `mgmemployee_db`.`employee` WHERE (`id` = ?);", employee);
    }


    // Update the given employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }

    allRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.department AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
}

module.exports = new Employee_DB(connection)