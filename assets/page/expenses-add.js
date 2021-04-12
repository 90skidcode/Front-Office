$(document).ready(function() {


    /**
     * Set Current Date for New Field
     */

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    if (isEmptyValue(id)) {
        var now = new Date();
        var month = (now.getMonth() + 1);
        var day = now.getDate();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        var today = now.getFullYear() + '-' + month + '-' + day;
        document.getElementById("currentDate").defaultValue = today;
    } else {

    }

    /*
     * Select 2 
     */
    $("select").select2();


    listexpensesType();
    listPaymentType();
    checkAddOrEdit('expenses_master', 'expenses_id');
    /**
     * Add expenses
     */

    $('.expenses-add').click(function() {
        if (checkRequired('#expenses-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'expenses_master',
                    "values": $("#expenses-add").serializeObject()
                }
                commonAjax('database.php', 'POST', data, '#expenses-add', 'Expenses added successfully');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'expenses_master',
                    "values": $("#expenses-add").serializeObject(),
                    "condition": {
                        "expenses_id": id
                    },
                }
                commonAjax('database.php', 'POST', data, '', 'Expenses  updated successfully');
            }
        }
    });


    /**
     * Add expenses Type
     */

    $(document).on('click', '.save-expenses-type', function() {
        if (checkRequired('.expenses_type_modal')) {
            let data = {
                "query": 'add',
                "databasename": 'expenses_type',
                "values": $(".expenses_type_modal").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.expenses_type_modal', 'Expenses type added successfully');
            listexpensesType();
            $("#expenses_type_modal").modal('hide');
        }
    });

    /**
     * Add Payment Type
     */

    $(document).on('click', '.save-expenses-payment-type', function() {
        if (checkRequired('.expenses_payment_type_modal')) {
            let data = {
                "query": 'add',
                "databasename": 'payment_master',
                "values": $(".expenses_payment_type_modal").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.expenses_payment_type_modal', 'Payment type added successfully');
            listPaymentType();
            $("#expenses_payment_type_modal").modal('hide');
        }
    });
})

/**
 * List expenses Type in select 2
 */

function listexpensesType() {
    let data = {
        "query": 'fetch',
        "databasename": 'expenses_type',
        "column": {
            "expenses_type": "expenses_type"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#expenses_type", "param2": "expenses_type" })
}


/**
 * List Payment Type in select 2
 */

function listPaymentType() {
    let data = {
        "query": 'fetch',
        "databasename": 'payment_master',
        "column": {
            "payment_mode": "payment_mode"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#expenses_payment_type", "param2": "payment_mode" })
}