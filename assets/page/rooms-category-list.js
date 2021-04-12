displayRoomListInit()

function displayRoomListInit() {
    var data = {
        "query": 'fetch',
        "databasename": 'room_category',
        "column": { "*": "*" },
        "condition": { "status": "A" }
    }

    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayRoomList", "param1": "table-room-category-list" });
}

function displayRoomList(response, dataTableId) {
    var tableHeader = [{
        "data": "room_category"
    }, {
        "data": "room_capacity_adults"
    }, {
        "data": "room_capacity_infant"
    }, {
        "data": "room_price"
    }, /* EDIT */ /* DELETE */ {
        "data": "room_category",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="room-category-add.html?id=${row.room_category_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.room_category_id}" data-toggle="modal" data-target="#delete">
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