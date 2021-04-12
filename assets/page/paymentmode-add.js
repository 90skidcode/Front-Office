$(document).ready(function() {

    checkAddOrEdit('payment_master', 'payment_master_id');
    /**
     * Add Agent
     */

    $('.paymentmode-add').click(function() {
        if (checkRequired('#paymentmode-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'payment_master',
                    "values": $("#paymentmode-add").serializeObject()
                }
                commonAjax('database.php', 'POST', data, '#paymentmode-add', 'Agent added successfully');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'payment_master',
                    "values": $("#paymentmode-add").serializeObject(),
                    "condition": {
                        "payment_master_id": id
                    }
                }
                commonAjax('database.php', 'POST', data, '', 'Agent updated successfully');
            }
        }
    });
})