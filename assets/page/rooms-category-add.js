$(document).ready(function() {
    /*
     * Select 2 
     */
    $("select").select2();


    checkAddOrEdit('room_category', 'room_category_id');


    /**
     * Add Room
     */

    $('.room-category-add').click(function() {
        if (checkRequired('#room-category-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'room_category',
                    "values": $("#room-category-add").serializeObject()
                }
                commonAjax('database.php', 'POST', data, '#room-category-add', 'Room Category added successfully');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'room_category',
                    "values": $("#room-category-add").serializeObject(),
                    "condition": {
                        "room_category_id": id
                    },
                }
                commonAjax('database.php', 'POST', data, '', 'Room Category updated successfully');
            }
        }
    });
})