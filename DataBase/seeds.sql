USE mgmEmployee_db

INSERT INTO department (department) 
VALUES 
    ('Human Resources'),
    ('Finance'),
    ('IT'),
    ('Engineering')

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('HR Manager', 80000, 1),
    ('HR', 50000, 1),
    ('Marketing Director', 120000, 2),
    ('Sales', 55000, 2),
    ('IT Director', 200000, 3),
    ('Desktop Support', 700000, 3),
    ('Software Engineer Manager', 110000, 4),
    ('Software Engineer', 93000, 4);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Enzo', 'Perez', 1, NULL),
    ('Javier', 'Pinola', 2, 1),
    ('Franco', 'Armani', 3, NULL),
    ('Alicia', 'Ekstein', 4, 3),
    ('Maria', 'Barbera', 4, 3),
    ('Gonzalo', 'Montiel', 5, NULL),
    ('Eva', 'Ardiles', 6, 5),
    ('Matias', 'Suarez', 6, 5),
    ('Nicolas', 'DeLaCruz', 7, NULL),
    ('Vera', 'Baggio', 8, 7);