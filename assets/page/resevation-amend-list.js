$(document).ready(function() {
    displayReservationListInit();
    listPaymentType();
});

/**
 * List Payment Type in select 2
 */

function listPaymentType() {
    let data = {
        "query": 'fetch',
        "databasename": 'payment_master',
        "column": {
            "payment_mode": "payment_mode",
            "payment_master_id": "payment_master_id"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#payment_mode", "param2": "payment_mode", "param3": "payment_master_id" })
}

function displayReservationListInit() {
    let data = { "list_key": "list_reservation", "status": "AM" };
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayReservationList", "param1": "table-resevation-list" });
}

function displayReservationList(response, dataTableId) {
    var tableHeader = [{
        "data": "reservation_no"
    }, {
        "data": "customer_fname"
    }, {
        "data": "customer_phone"
    }, {
        "data": "travel_agency_name"
    }, {
        "data": "meal_count"
    }, {
        "data": "advance"
    }, {
        "data": "total_amount"
    }, /* EDIT */ /* DELETE */ {
        "data": "reservation_no",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="reservation-add.html?id=${row.reservation_no}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance" title='Add Advance' data-type="reservation-advance" data-customerid="${row.customer_id}" data-total="${row.total_amount}" data-advance="${row.advance}" data-reservation="${row.reservation_no}" data-toggle="modal" data-target="#advance-modal">
                        <i class="anticon anticon-dollar text-primary"></i>
                    </button>         
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance-list" data-type="reservation"  data-customerid="${row.customer_id}" data-total="${row.total_amount}" data-advance="${row.advance}" data-reservation="${row.reservation_no}" data-toggle="modal" data-target="#advance-list-modal">
                        <i class="anticon anticon-solution text-primary"></i>
                    </button>       
                    <a href="reservation-print.html?id=${row.reservation_no}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-printer text-primary"></i>
                    </a>   
                    <a title="Convert To Booking" href="booking-add.html?type=reservation&id=${row.reservation_no}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-plus text-primary"></i>
                    </a>                 
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-delete="${row.reservation_no}" data-toggle="modal" data-target="#delete">
                        <i class="anticon anticon-delete text-danger"></i>
                    </button>
                </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId)
}