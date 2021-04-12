$(document).ready(function() {

    checkAddOrEdit('employee_type', 'employee_type_id');

    /**
     * Add employee-type
     */

    $('.employee-type-add').click(function() {
        if (checkRequired('#employee-type-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'employee_type',
                    "values": $("#employee-type-add").serializeObject()
                }
                commonAjax('database.php', 'POST', data, '#employee-type-add', 'Expenses added successfully');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'employee_type',
                    "values": $("#employee-type-add").serializeObject(),
                    "condition": {
                        "employee_type_id": id
                    },
                }
                commonAjax('database.php', 'POST', data, '', 'Expenses  updated successfully');
            }
        }
    });


})