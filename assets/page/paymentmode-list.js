displayPaymentModeListInit()


function displayPaymentModeListInit() {
    let data = {
        'query': 'fetch',
        'databasename': 'payment_master',
        'column': {
            '*': '*'
        },
        'condtion': {
            'status': 1
        }
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayPaymentModeList", "param1": "table-paymentmode-list" });
}

function displayPaymentModeList(response, dataTableId) {
    var tableHeader = [{
        "data": "payment_mode"
    }, /* EDIT */ /* DELETE */ {
        "data": "payment_mode",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="paymentmode-add.html?id=${row.payment_master_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.payment_master_id}" data-toggle="modal" data-target="#delete">
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
        'databasename': 'payment_master',
        'condition': {
            'payment_master_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
})