displayMealPlanListInit()


function displayMealPlanListInit() {
    let data = {
        'query': 'fetch',
        'databasename': 'meal_plan',
        'column': {
            '*': '*'
        },
        'condtion': {
            'status': 1
        }
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayMealPlanList", "param1": "table-mealplan-list" });
}

function displayMealPlanList(response, dataTableId) {
    var tableHeader = [{
        "data": "meal_plan_full"
    }, {
        "data": "meal_plan_short"
    }, {
        "data": "meal_price"
    }, /* EDIT */ /* DELETE */ {
        "data": "meal_plan_full",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="mealplan-add.html?id=${row.meal_plan_id}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.meal_plan_id}" data-toggle="modal" data-target="#delete">
                        <i class="anticon anticon-delete text-danger"></i>
                    </button>
                </td>`;
        }
    }];
    dataTableDisplay(response, tableHeader, false, dataTableId);
}

$(document).on('click', ".btn-delete", function() {
    var data = {
        'query': 'update',
        'databasename': 'meal_plan',
        'condition': {
            'mealplan_id': $(".btn-delete").attr('data-detete')
        },
        'values': {
            'status': '0'
        }
    }
    $("#delete").modal('hide');
    commonAjax('database.php', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" })
})