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
    let data = { "list_key": "list_reservation", "status": "'B','A','AM','D','N'" };
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
        "data": "reservation_status",
        mRender: function(data, type, row) {
            switch (row.reservation_status) {
                case 'B':
                    return 'Booking';
                    break;
                case 'N':
                    return 'No Show';
                    break;
                case 'D':
                    return 'Deleted';
                    break;
                case 'AM':
                    return 'Amend';
                    break;
                case 'A':
                    return 'Reserved';
                    break;
                default:
                    return '';
                    break;
            }
        }
    }, {
        "data": "total_amount"
    }, /* EDIT */ /* DELETE */ {
        "data": "reservation_no",
        mRender: function(data, type, row) {
            if (row.reservation_status == 'A') {
                return `<td class="text-right">
                    <a href="reservation-add.html?id=${row.reservation_no}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-edit text-primary"></i>
                    </a>          
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance no-add" title='Add Advance' data-type="reservation-advance" data-customerid="${row.customer_id}" data-total="${row.total_amount}" data-advance="${row.advance}" data-reservation="${row.reservation_no}" data-toggle="modal" data-target="#advance-modal">
                        <i class="anticon anticon-dollar text-primary"></i>
                    </button>         
                    <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance-list no-add" data-type="reservation"  data-customerid="${row.customer_id}" data-total="${row.total_amount}" data-advance="${row.advance}" data-reservation="${row.reservation_no}" data-toggle="modal" data-target="#advance-list-modal">
                        <i class="anticon anticon-solution text-primary"></i>
                    </button>     
                    <a href="reservation-print.html?id=${row.reservation_no}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                        <i class="anticon anticon-printer text-primary"></i>
                    </a> 
                    <a title="Convert To Booking" href="booking-add.html?type=reservation&id=${row.reservation_no}" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right no-add">
                        <i class="anticon anticon-plus text-primary"></i>
                    </a>                   
                    <button type="button" title='No Show' class="btn btn-icon btn-hover btn-sm btn-rounded pull-right no-add no-show" data-reservation-no="${element.reservation_no}" >
                        <i class="anticon anticon-trash-o text-danger"></i>
                    </button>
                </td>`;
            } else
                return `<td class="text-right">
                        <a href="reservation-add.html?id=${row.reservation_no}&type=view" class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                            <i class="anticon anticon-eye text-primary"></i>
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
})

$(document).on('click', '.no-show', function() {
    var data = {
        "query": 'update',
        "databasename": 'reservation_master_new',
        "values": {
            "reservation_status": 'N'
        },
        "condition": {
            "reservation_no": $(this).attr('data-reservation-no')
        }
    }
    commonAjax('database.php', 'POST', data, '', 'Processed successfully', '', { 'functionName': 'locationReload' });
});