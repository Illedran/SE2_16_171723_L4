"use strict";

var exports = module.exports = {};

var data = [
    {
        id: 1,
        name: "Mario",
        surname: "Rossi",
        level: 1,
        salary: 3500
    },
    {
        id: 2,
        name: "Giovanni",
        surname: "Verdi",
        level: 4,
        salary: 6000
    },
    {
        id: 3,
        name: "Matteo",
        surname: "Viola",
        level: 2,
        salary: 4000
    },
    {
        id: 4,
        name: "Gianna",
        surname: "Valentini",
        level: 1,
        salary: 3500
    }
];

var counter = data.length;

exports.insert_employee = function (id, name, surname, level, salary) {
    if (id == null) {
        counter = counter + 1;
        data.push({
            id: counter,
            name: name,
            surname: surname,
            level: level,
            salary: salary
        });
        return counter;
    } else {
        var employee = exports.get_employee(id);
        if (employee !== undefined) {
            employee['name'] = name;
            employee['surname'] = surname;
            employee['level'] = level;
            employee['salary'] = salary;
        } else {
            data.push({
                id: id,
                name: name,
                surname: surname,
                level: level,
                salary: salary
            });
        }
        return id;
    }
};

exports.get_employee = function (id) {
    return data.find(function (element) {
        return element['id'] == id;
    });
};

exports.get_all_employees = function () {
    return data.reduce(function (a, b) {
        return a.concat(b['id']);
    }, []);
};

exports.delete_employee = function (id) {
    return data.splice(data.indexOf(exports.get_employee(id)), 1);
};
