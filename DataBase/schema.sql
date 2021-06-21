DROP DATABASE IF EXISTS mgmEmployee_db;
CREATE DATABASE mgmEmployee_db;

USE mgmEmployee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT
  PRIMARY KEY (id)
)

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
 role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
)
