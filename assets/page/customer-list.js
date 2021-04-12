displayCustomerListInit()


function displayCustomerListInit() {
    let data = { "list_key": "list_general_tables", "table_name": "customer_master", "column": "*", "condition": { "status": "1" } }
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayCustomerList", "param1": "table-customer-list" });
}

function displayCustomerList(response, dataTableId) {
    var tableHeader = [{
        "data": "customer_fname"
    }, {
        "data": "customer_phone"
    }, {
        "data": "customer_pincode"
    }, {
        "data": "customer_address"
    }, /* EDIT */ /* DELETE */ {
        "data": "room_name",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="customer-add.html?id=${row.customer_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.customer_id}" data-toggle="modal" data-target="#delete">
                        <i class="anticon anticon-delete text-danger"></i>
                    </button>
                </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId)
}

$(document).on('click', ".btn-delete", function() {
    var data = {
        'query': 'update',
        'databasename': 'customer_master',
        'condition': {
            'customer_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
})