displayRoomListInit();

function displayRoomListInit() {
    let data = { "query": "fetch", "list_key": "list_room_master", "column": { "*": "*" }, "condition": { "room_master.current_status": "D" } }
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
            return `<td class="text-right ">         
            <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-clean" data-id="${row.room_master_id}" data-toggle="modal" data-target="#room-stauts">
                                
                        <i class="anticon anticon-issues-close font-size-20 text-danger pointer " ></i>
                    </button>
                </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId)
}



$(document).on('click', ".btn-clean", function() {
    $(".btn-room-status").attr('data-id', $(this).attr('data-id'));
});

$(document).on('click', ".btn-room-status", function() {
    var data = {
        'query': 'update',
        'databasename': 'room_master',
        'condition': {
            'room_master_id': $(".btn-room-status").attr('data-id')
        },
        'values': {
            'current_status': 'A'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Updated Sucessfully', '', { "functionName": "locationReload" })

})