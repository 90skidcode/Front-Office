displayEmployeeTypeListInit()

function displayEmployeeTypeListInit() {
    let data = {
        "query": 'fetch',
        "databasename": "employee_type",
        "column": {
            "*": "*"
        },
        "condition": {
            "status": "1"
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayEmployeeTypeList", "param1": "table-employee-type-list" });
}

function displayEmployeeTypeList(response, dataTableId) {
    var tableHeader = [{
        "data": "employee_type"
    }, /* EDIT */ /* DELETE */ {
        "data": "employee_type",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="employee-type-add.html?id=${row.employee_type_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.employee_type_id}" data-toggle="modal" data-target="#delete">
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