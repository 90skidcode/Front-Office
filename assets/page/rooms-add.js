$(document).ready(function() {
    /*
     * Select 2 
     */
    $("select").select2();


    listRoomType();
    listFloor();
    checkAddOrEdit('room_master', 'room_master_id');
    /**
     * Add Room
     */

    $('.room-add').click(function() {
        if (checkRequired('#room-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'room_master',
                    "values": $("#room-add").serializeObject()
                }
                commonAjax('database.php', 'POST', data, '#room-add', 'Room added successfully');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'room_master',
                    "values": $("#room-add").serializeObject(),
                    "condition": {
                        "room_master_id": id
                    },
                }
                commonAjax('database.php', 'POST', data, '', 'Room  updated successfully');
            }
        }
    });



    /**
     * Add Floor
     */

    $(document).on('click', '.save-floor', function() {
        if (checkRequired('.hotel_floor_modal')) {
            let data = {
                "query": 'add',
                "databasename": 'floor_master',
                "values": $(".hotel_floor_modal").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.hotel_floor_modal', 'Floor added successfully');
            listFloor();
            $("#hotel_floor_modal").modal('hide');
        }
    });
})

/**
 * List Room Type in select 2
 */

function listRoomType() {
    let data = {
        "query": 'fetch',
        "databasename": 'room_category',
        "column": {
            "room_category": "room_category"
        },
        "condition": {
            "status": 'A'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#hotel_room_category", "param2": "room_category" })
}


/**
 * List Room Floor in select 2
 */

function listFloor() {
    let data = {
        "query": 'fetch',
        "databasename": 'floor_master',
        "column": {
            "floor_name": "floor_name"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#hotel_room_floor_no", "param2": "floor_name" })
}