$(document).ready(function() {

    checkAddOrEdit('meal_plan', 'meal_plan_id');
    /**
     * Add Agent
     */

    $('.mealplan-add').click(function() {
        if (checkRequired('#mealplan-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'meal_plan',
                    "values": $("#mealplan-add").serializeObject()
                }
                commonAjax('database.php', 'POST', data, '#mealplan-add', 'Agent added successfully');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'meal_plan',
                    "values": $("#mealplan-add").serializeObject(),
                    "condition": {
                        "meal_plan_id": id
                    }
                }
                commonAjax('database.php', 'POST', data, '', 'Agent updated successfully');
            }
        }
    });
})