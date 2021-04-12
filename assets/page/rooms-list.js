displayRoomListInit()

function displayRoomListInit() {
    let data = { "query": "fetch", "list_key": "list_room_master", "column": { "*": "*" }, "condition": { "room_master.status": "A" } }

    commonAjax('', 'POST', data, '', '', '', { "functionName": "displayRoomList", "param1": "table-room-list" });
}

function displayRoomList(response, dataTableId) {
    var tableHeader = [{
        "data": "room_no"
    }, {
        "data": "room_name"
    }, {
        "data": "room_category"
    }, {
        "data": "floor_name"
    }, /* EDIT */ /* DELETE */ {
        "data": "room_name",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="room-add.html?id=${row.room_master_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.room_master_id}" data-toggle="modal" data-target="#delete">
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
        'databasename': 'room_master',
        'condition': {
            'room_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': 'D'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })

})