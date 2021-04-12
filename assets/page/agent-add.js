$(document).ready(function() {

    listCountry();

    checkAddOrEdit('travel_agency', 'travel_agency_id');
    /**
     * Add Agent
     */

    $('.agent-add').click(function() {
        if (checkRequired('#agent-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'travel_agency',
                    "values": $("#agent-add").serializeObject()
                }
                commonAjax('database.php', 'POST', data, '#agent-add', 'Agent added successfully');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'travel_agency',
                    "values": $("#agent-add").serializeObject(),
                    "condition": {
                        "travel_agency_id": id
                    }
                }
                commonAjax('database.php', 'POST', data, '', 'Agent updated successfully');
            }
        }
    });
})