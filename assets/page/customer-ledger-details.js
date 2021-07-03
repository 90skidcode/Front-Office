displayCustomerListInit()
listPaymentType()

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

function displayCustomerListInit() {
    var url = new URL(window.location.href);
    var booking_no = url.searchParams.get("booking_no");
    var room_no = url.searchParams.get("room_no");
    if (typeof(room_no) != 'undefined' && room_no) {
        var data = { "list_key": "get_ledger", "booking_no": booking_no, "room_no": room_no };
    } else {
        var data = { "list_key": "get_ledger", "booking_no": booking_no }
    };
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayCustomerList", "param1": "table-customer-ledger" });
}

function displayCustomerList(response) {
    var bookingArray = response.result.booking_details;
    var roomNo = bookingArray.map(x => x.room_no);
    var bookingDate = new Date(bookingArray[0].hotel_from_date).toString().split("GMT");
    $('h4.float-left').html("Ledger Details");
    let customerDom = ` <ul>
                            <li>
                                <p><b>Customer Name</b></p>
                                <p>${bookingArray[0].customer_fname}</p>
                            </li>
                            <li>
                                <p><b>Booking No</b></p>
                                <p class="booking-id">${bookingArray[0].booking_no}</p>
                            </li>                            
                            <li>
                                <p><b>Booking Date</b></p>
                                <p>${bookingDate[0]}</p>
                            </li>
                            <li>
                                <p><b>Room No</b></p>
                                <p  class="room-no">${roomNo.toString()}</p>
                            </li>
                            
                        </ul>`;
    $(".customer-info").html(customerDom);
    var roomDetails = '';
    response.result.booking_details.forEach(element => {

        roomDetails += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_category}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_no_of_night}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_from_date} / ${element.hotel_to_date}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_no}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_no_of_adults} / ${element.hotel_no_of_childs}</td>
                            <td class="text-right border-right-0 border-bottom-0 ">${element.hotel_price}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_discount}%</td>
                            <td class="text-right border-bottom-0 item-total">${element.room_total}</td>
                        </tr>`
    });

    $(".room-details").html(roomDetails);

    var advanceDetails = '';
    response.result.Advance.forEach(element => {
        var advanceDate = new Date(element.created_at).toString().split("GMT");
        advanceDetails += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${advanceDate[0]}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.customer_ledger_id}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.description} </td>
                            <td class="text-right border-right-0 border-bottom-0">${element.amount}</td>
                        </tr>`
    });

    $(".advance-details").html(advanceDetails);

    var HotelDetails = '';
    response.result.Hotel.forEach(element => {
        var advanceDate = new Date(element.created_at).toString().split("GMT");
        HotelDetails += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${advanceDate[0]}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.customer_ledger_id}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.description} </td>
                            <td class="text-right border-right-0 border-bottom-0">${element.amount} </td>
                        </tr>`
    });

    $(".hotel-details").html(HotelDetails);
}


/**
 * Advance
 */


let advanceHtml = `
 <!-- Modal Floor -->
 <div class="modal fade" id="advance-modal">
     <div class="modal-dialog">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title" id="exampleModalLabel">Add Bill</h5>
                 <button type="button" class="close" data-dismiss="modal">
                 <i class="anticon anticon-close"></i>
             </button>
             </div>
             <div class="modal-body">
                 <form id="advance-payment-add">
                     <div class="form-row">
                     <div class="form-group col-md-12 hide" id="bill_no">
                             <label for="payment_mode">Bill No</label>
                             <input type="number" name="bill_no" required class="bill_no font-weight-bolder form-control text-right ">
                         </div>
                         <div class="form-group col-md-6">
                             <label for="payment_mode">Payment Mode</label>
                             <select class="select2" class="payment_mode" id="payment_mode" name="payment_mode" required>                                                                                               
                             </select>
                         </div>
                         <div class="form-group col-md-6">
                             <label for="advance">Advance</label>
                             <input type="number" name="advance" required class="advance font-weight-bolder form-control text-right">
                             <input type="hidden" name="customer_id" class="form-control customer-id">
                         </div>
                         <div class="form-group col-md-12">
                         <label for="payment_mode">Description</label>
                         <textarea class="description font-weight-bolder form-control" required></textarea>
                     </div>
                     </div>
                 </form>
             </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                 <button type="button" class="btn btn-primary save-advance" data-print="false">Save</button>
             </div>
         </div>
     </div>
 </div>`;

$("body").append(advanceHtml);

$(document).on('click', ".btn-advance", function() {
    $("#advance-payment-add")[0].reset();
    $('#advance-modal').modal('show');
    ($(this).attr('data-type') == 'Hotel') ? $("#bill_no").show(): $("#bill_no").hide();
    $(".save-advance").attr('data-type', $(this).attr('data-type'));
})

$(document).on('click', ".save-advance", function() {
    if (checkRequired('#advance-payment-add')) {
        let data = { "list_key": "Addledger" };
        data['booking_id'] = $('.booking-id').text();
        data['room_no'] = $('.room-no').text();
        data['income_type'] = $(this).attr('data-type');
        data['payment_type'] = $("#payment_mode").val();
        data['description'] = $(".description").val();
        if ($(this).attr('data-type') == 'Hotel')
            data['description'] = $("#bill_no").val();
        var now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        data['income_date'] = now.toISOString().slice(0, 16);
        data['amount'] = $(".advance").val();
        let printFlag = false;
        if ($(this).attr('data-print') == 'true')
            printFlag = true;
        commonAjax('', 'POST', data, '', "Advance Added Succesfully", "Advance Added Failed!!! Please try Again.", { "functionName": "succesAdvanceUpdate", "param1": printFlag });
    }
})

function succesAdvanceUpdate(res, printFlag) {
    $("#advance-modal").modal('hide');
    displayCustomerListInit();
}