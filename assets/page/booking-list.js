$(document).ready(function() {
    displayBookingListInit();
    listPaymentType()
})

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

function displayBookingListInit() {
    let data = { "list_key": "list_booking", "status": "A" };
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayBookingList", "param1": "table-resevation-list" });
}

function displayBookingList(response, dataTableId) {
    var tableHeader = [{
        "data": "booking_no"
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
        "data": "booking_no",
        mRender: function(data, type, row) {
            return `<td class="text-right">
                    <a href="booking-add.html?id=${row.booking_no}" title='Edit' class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance" title='Add Advance'  data-type="booking"  data-customerid="${row.customer_id}" data-total="${row.total_amount}" data-advance="${row.advance}" data-booking="${row.booking_no}" data-toggle="modal" data-target="#advance-modal">
                        <i class="anticon anticon-dollar text-primary"></i>
                    </button>
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance-list" title='Advance List' data-type="booking"  data-total="${row.total_amount}" data-advance="${row.advance}" data-booking="${row.booking_no}" data-toggle="modal" data-target="#advance-list-modal">
                        <i class="anticon anticon-solution text-primary"></i>
                    </button>     
                    <a href="booking-print.html?id=${row.booking_no}" title='Print Booking' class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-printer text-primary"></i>
                    </a>  
                    <a href="booking-add.html?id=${row.booking_no}&type=checkout" title='Checkout Booking' class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-logout text-danger"></i>
                    </a>  
                </td>`;
        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId)
}

$(document).on('click', ".btn-delete", function() {
    var data = {};
    if (typeof($(this).attr('data-type')) != 'undefined') {
        data['list_key'] = 'remove_advance';
        data['advance_master_id'] = $(this).attr('data-detete');
    }

    $("#delete").modal('hide');
    commonAjax('', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" });
});