displayExpensesListInit()

function displayExpensesListInit() {
    let data = {
        "query": "fetch",
        "databasename": "employee_master",
        "column": {
            "*": "*"
        },
        "condition": {
            "employee_master.status": "1"
        },
        "like": "",
        "limit": "10000000"
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayExpensesList", "param1": "table-employee-list" });
}

function displayExpensesList(response, dataTableId) {
    var tableHeader = [{
        "data": "employee_id"
    }, {
        "data": "employee_name"
    }, {
        "data": "employee_address"
    }, {
        "data": "employee_email"
    }, {
        "data": "employee_phone"
    }, /* EDIT */ /* DELETE */ {
        "data": "room_name",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="employee-add.html?id=${row.employee_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.expenses_id}" data-toggle="modal" data-target="#delete">
                        <i class="anticon anticon-delete text-danger"></i>
                    </button>
                </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId)
}

$(document).on('click', ".btn-delete", function() {
    var data = {
        'query': 'update',
        'databasename': 'expenses_master',
        'condition': {
            'expenses_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })

})