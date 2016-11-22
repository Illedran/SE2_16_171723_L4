(function () {
    "use strict";
    var employeeSearchSubmit = document.getElementById("employee-search-submit"),
        searchForm = document.getElementById("employee-search"),
        employeeSearchId = document.getElementById("employee-search-id"),
        searchResults = document.getElementById("search-results"),
        tableId = document.getElementById("table-id"),
        tableName = document.getElementById("table-name"),
        tableSurname = document.getElementById("table-surname"),
        tableLevel = document.getElementById("table-level"),
        tableSalary = document.getElementById("table-salary"),
        tableError = document.getElementById("table-error"),
        removeForm = document.getElementById("employee-remove"),
        employeeRemoveId = document.getElementById("employee-remove-id"),
        employeeRemoveSubmit = document.getElementById("employee-remove-submit"),
        showEmployeeAddForm = document.getElementById("show-form-employee-add"),
        addForm = document.getElementById("employee-add"),
        formId = document.getElementById("form-id"),
        formName = document.getElementById("form-name"),
        formSurname = document.getElementById("form-surname"),
        formLevel = document.getElementById("form-level"),
        formSalary = document.getElementById("form-salary"),
        employeeAddSubmit = document.getElementById("employee-add-submit"),
        formError = document.getElementById("form-error");


    employeeSearchSubmit.addEventListener("click", function () {
        var xhr = new XMLHttpRequest();
        xhr.open(searchForm.method, searchForm.action, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        tableError.innerHTML = "";
        var data = {
            id: employeeSearchId.value
        };
        // send the collected data as JSON
        xhr.send(JSON.stringify(data));

        xhr.onloadend = function ()
        {
            var result=JSON.parse(xhr.responseText);
            searchResults.style.display = "block";
            if ('error' in result) {
                tableError.innerHTML = "Employee not found!";
                tableId.innerHTML = "";
                tableName.innerHTML = "";
                tableSurname.innerHTML = "";
                tableLevel.innerHTML = "";
                tableSalary.innerHTML = "";
                employeeRemoveId.value = "";
            } else {
                tableId.innerHTML = result['id'];
                tableName.innerHTML = result['name'];
                tableSurname.innerHTML = result['surname'];
                tableLevel.innerHTML = result['level'];
                tableSalary.innerHTML = result['salary'];
                employeeRemoveId.value = result['id'];
            }
        };
    }, false);
    employeeRemoveSubmit.addEventListener("click", function () {
        var xhr = new XMLHttpRequest();
        xhr.open(removeForm.method, removeForm.action, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        tableError.innerHTML = "";
        var data = {
            id: employeeRemoveId.value
        };

        // send the collected data as JSON
        xhr.send(JSON.stringify(data));

        xhr.onloadend = function ()
        {
            var result=JSON.parse(xhr.responseText);
            if ('error' in result) {
                tableError.innerHTML = "Employee not found!";
            } else {
                searchResults.style.display = "none";
            }
        };
    }, false);
    showEmployeeAddForm.addEventListener("click", function () {
        if (addForm.style.display === "block") {
            addForm.style.display = "none";
        } else {
            addForm.style.display = "block";
        }
    }, false);
    employeeAddSubmit.addEventListener("click", function () {
        var xhr = new XMLHttpRequest();
        xhr.open(addForm.method, addForm.action, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        tableError.innerHTML = "";
        var data = {
            id: formId.value !== null ? formId.value : null,
            name: formName.value,
            surname: formSurname.value,
            level: formLevel.value,
            salary: formSalary.value
        };

        // send the collected data as JSON
        xhr.send(JSON.stringify(data));

        xhr.onloadend = function ()
        {
            var result=JSON.parse(xhr.responseText);
            if ('id' in result) {
                formError.innerHTML = "Added employee #" + result['id'];
                formId.value = "";
                formName.value = "";
                formSurname.value = "";
                formLevel.value = "";
                formSalary.value = "";
            }
        };
    }, false);

}());