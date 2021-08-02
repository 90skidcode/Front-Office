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
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance" title='Add Advance' data-type="reservation" data-customerid="${row.customer_id}" data-total="${row.total_amount}" data-advance="${row.advance}" data-reservation="${row.reservation_no}" data-toggle="modal" data-target="#advance-modal">
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


$(document).on('click', ".btn-advance", function() {
    $("#total_amount").html("Total  : Rs." + $(this).attr('data-total'));
    $("#total_advance").html("Advance Total : Rs." + $(this).attr('data-advance'));
    let balance = Number($(this).attr('data-total')) - Number($(this).attr('data-advance'));
    $("#total_balance").html("Balance : Rs." + balance);
    $(".save-advance").attr('data-reservation', $(this).attr('data-reservation'));
})

$(document).on('click', ".btn-advance-list", function() {
    let html = `<table width="100%" id="table-advance-list" class="table table-striped responsive-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Payment Mode</th>
                            <th>Advance Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center" colspan="4">No Record Found!!!</td>
                        </tr>
                    </tbody>
                </table>`;
    $(".table-advance-list").html(html);
    let data = { "list_key": "get_advance_detail", "advance_no": $(this).attr('data-reservation') }
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayAdvanceList", "param1": "#table-advance-list tbody" });
})

function displayAdvanceList(response, dataTableId) {
    console.log(response.result);
    let html = ``;
    $.each(response.result, function(i, v) {
        html += `  <tr>
                        <td>${v.created_at}</td>
                        <td>${v.payment_mode}</td>
                        <td>${v.advance_amount}</td>
                        <td>                                   
                            <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-delete-table" data-type="advance" data-delete="${v.advance_master_id}" data-toggle="modal" data-target="#delete">
                                <i class="anticon anticon-delete text-danger"></i>
                            </button>
                        </td>
                    </tr>`;
    });

    if (html.trim())
        $(dataTableId).html(html);
}

$(document).on('click', ".btn-delete", function() {
    var data = {};
    if (typeof($(this).attr('data-type')) != 'undefined') {
        data['list_key'] = 'remove_advance';
        data['advance_master_id'] = $(this).attr('data-detete');
    }

    $("#delete").modal('hide');
    commonAjax('', 'POST', data, '', 'Record Deleted Sucessfully', '', { "functionName": "locationReload" });

})


$(document).on('click', ".save-advance", function() {
    if (checkRequired('#advance-payment-add')) {
        let data = { "list_key": "advance_insert" };
        data['reservation_no'] = $(this).attr('data-reservation');
        data['payment_mode'] = $("#payment_mode").val();
        data['customer_id'] = $(".customer-id").val();
        data['advance'] = $(".advance").val();
        let printFlag = false;
        if ($(this).attr('data-print') == 'true')
            printFlag = true;
        commonAjax('', 'POST', data, '', "Advance Added Succesfully", "Advance Added Failed!!! Please try Again.", { "functionName": "succesAdvanceUpdate", "param1": printFlag });
    }
})

function succesAdvanceUpdate(res, printFlag) {
    $("#advance-modal").modal('hide');


}