displayAgentListInit()


function displayAgentListInit() {
    let data = {
        'query': 'fetch',
        'databasename': 'travel_agency',
        'column': {
            '*': '*'
        },
        'condtion': {
            'status': 1
        }
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayAgentList", "param1": "table-agent-list" });
}

function displayAgentList(response, dataTableId) {
    var tableHeader = [{
        "data": "travel_agency_name"
    }, {
        "data": "travel_agency_code"
    }, {
        "data": "travel_agency_address"
    }, {
        "data": "travel_agency_phone"
    }, {
        "data": "travel_agency_contact_person"
    }, {
        "data": "travel_agency_contact_phone"
    }, /* EDIT */ /* DELETE */ {
        "data": "travel_agency_name",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="agent-add.html?id=${row.travel_agency_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.travel_agency_id}" data-toggle="modal" data-target="#delete">
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
        'databasename': 'travel_agency',
        'condition': {
            'agent_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
})