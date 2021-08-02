var url = new URL(window.location.href);
var booking_no = url.searchParams.get("booking_no");
var room_no = url.searchParams.get("room_no");
displayCustomerListInit();
listPaymentType();
listRoomType('room_category');
var triggeredBY = 'onload';

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
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#payment_mode", "param2": "payment_mode", "param3": "payment_master_id" });
}

/**
 * List Room Type in select 2
 */

function listRoomType(id) {
    let data = {
        "query": 'fetch',
        "databasename": 'room_category',
        "column": {
            "room_category": "room_category"
        },
        "condition": {
            "status": 'A'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#" + id, "param2": "room_category" })
}

function displayCustomerListInit() {
    var url = new URL(window.location.href);
    var booking_no = url.searchParams.get("booking_no");
    var room_no = url.searchParams.get("room_no");
    if (typeof(room_no) != 'undefined' && room_no) {
        var data = { "list_key": "get_ledger", "booking_no": booking_no, "room_no": room_no };
    } else {
        var data = { "list_key": "get_ledger", "booking_no": booking_no };
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
                                <p>${response.result.Booking[0].customer_fname}</p>
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

    var ledgerDetails = '';
    let lTotal = 0;
    response.result.Booking.forEach(element => {
        let lDate = new Date(element.created_at).toString().split("GMT");

        ledgerDetails += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${element.customer_ledger_id}</td>
                            <td class="text-center border-right-0 border-bottom-0">${lDate[0]}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_no}</td>
                            <td class="text-right border-right-0 border-bottom-0">${numberWithCommas(element.amount)}</td>
                        </tr>`;
        lTotal += Number(element.amount);

    });

    ledgerDetails += `<tr class="bg">
                        <td class="text-right border-right-0 border-bottom-0 font-size-20" colspan='3'>Total</td>
                        <td class="text-right border-right-0 border-bottom-0 font-size-20" >${numberWithCommas(lTotal)}</td>
                    </tr>`;

    $(".leadger-details").html(ledgerDetails);

    var roomDetails = '';
    let rTotal = 0;
    var roomInHouseCount = 0;
    response.result.booking_details.forEach(element => {
        (roomStatus(element.room_status).status == 'In House') ? roomInHouseCount++ : '';
    })
    response.result.booking_details.forEach(element => {
        var action = '';

        if (roomStatus(element.room_status).status == 'In House') {
            if (!room_no && roomInHouseCount != 1)
                action = `<button type="button"  class="btn btn-icon btn-hover btn-sm btn-rounded swap-bill-room-select" data-room="${element.room_no}"><i class="anticon anticon-retweet font-size-20 text-primary" title="Bill Swap"></i> </button><button type="button"  class="btn btn-icon btn-hover btn-sm btn-rounded btn-room-swap" data-room="${element.room_no}"> <i class="anticon anticon-warning font-size-20 text-warning" title="Room Swap"></i> </button><a href="customer-ledger-details.html?booking_no=${booking_no}&room_no=${element.room_no}" class="btn btn-icon btn-hover btn-sm btn-rounded" > <i class="anticon anticon-disconnect text-danger font-size-20" title="Split Bill"></i> </a>`;
            else
                action = `<button type="button"  class="btn btn-icon btn-hover btn-sm btn-rounded swap-bill-room-select" data-room="${element.room_no}"><i class="anticon anticon-retweet font-size-20 text-primary" title="Bill Swap"></i> </button><button type="button"  class="btn btn-icon btn-hover btn-sm btn-rounded btn-room-swap" data-room="${element.room_no}"> <i class="anticon anticon-warning font-size-20 text-warning" title="Room Swap"></i> </button><button type="button" class="btn btn-icon btn-hover btn-sm btn-rounded btn-split-bill" data-room="${element.room_no}"> <i class="anticon anticon-logout text-danger font-size-20" title="Split Bill"></i> </button>`;
        }
        roomDetails += `<tr ststus="${element.room_status}">
                            <td class="text-center border-right-0 border-bottom-0">${element.room_category}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_no_of_night}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_from_date} <br>/<br> ${element.hotel_to_date}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_no} <br> ${roomStatus(element.room_status).html}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_no_of_adults} / ${element.hotel_no_of_childs}</td>
                            <td class="text-right border-right-0 border-bottom-0 ">${numberWithCommas(element.hotel_price)}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_discount}%</td>
                            <td class="text-right border-bottom-0 item-total">${numberWithCommas(element.room_total)}</td>
                            <td class="text-center border-bottom-0 ">${action}</td>
                        </tr>`;
        rTotal += Number(element.room_total);
    });

    roomDetails += `<tr class="bg">
                        <td class="text-right border-right-0 border-bottom-0 font-size-14 font-weight-bold" colspan='7'>Total</td>
                        <td class="text-right border-right-0 border-bottom-0 font-size-14 font-weight-bold" >${numberWithCommas(rTotal)}</td>
                        <td class="text-right border-right-0 border-bottom-0 font-size-20" ></td>
                    </tr>`;

    $(".room-details").html(roomDetails);

    var advanceDetails = '';
    let aTotal = 0;
    response.result.Advance.forEach(element => {
        var advanceDate = new Date(element.created_at).toString().split("GMT");
        advanceDetails += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${advanceDate[0]}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.customer_ledger_id}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.description} </td>
                            <td class="text-right border-right-0 border-bottom-0">${numberWithCommas(element.amount)}</td>
                        </tr>`;
        aTotal += Number(element.amount);
    });
    advanceDetails += `<tr class="bg">
                            <td class="text-right border-right-0 border-bottom-0 font-size-20" colspan='3'>Total</td>
                            <td class="text-right border-right-0 border-bottom-0 font-size-20" >${numberWithCommas(aTotal)}</td>
                        </tr>`;
    $(".advance-details").html(advanceDetails);

    var HotelDetails = '';
    let hTotal = 0;
    response.result.Hotel.forEach(element => {
        var advanceDate = new Date(element.created_at).toString().split("GMT");
        HotelDetails += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${advanceDate[0]}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.customer_ledger_id}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.description} </td>
                            <td class="text-right border-right-0 border-bottom-0">${numberWithCommas(element.amount)} </td>
                        </tr>`;
        hTotal += Number(element.amount);
    });
    HotelDetails += `<tr class="bg">
    <td class="text-right border-right-0 border-bottom-0 font-size-20" colspan='3'>Total</td>
    <td class="text-right border-right-0 border-bottom-0 font-size-20" >${numberWithCommas(hTotal)}</td>
</tr>`;
    $(".hotel-details").html(HotelDetails);

    /**
     * Summary
     */

    let summary = ` <div class="card-header"> <h3 class="p-2 p-l-0 m-0">Summary</h3> </div> 
                    <div class="card-body p-0"> 
                        <div class="list" data-id="v-pills-leadger-tab"> <p> Room Rent </p> <p>${ numberWithCommas(lTotal)} </p></div>                        
                        <div class="list" data-id="v-pills-leadger-tab"> <p> Hotel Bill </p> <p>${ numberWithCommas(hTotal)} </p></div>
                        <div class="list" data-id="v-pills-leadger-tab"> <p> Advance  </p> <p>${ numberWithCommas(aTotal)} </p></div>
                        <div class="list font-size-16 font-weight-bold" data-id="v-pills-leadger-tab"> <p> Total </p> <p>${ numberWithCommas(lTotal-aTotal+hTotal)} </p></div>
                    </div>`;

    $(".summary").html(summary);
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
                             <input type="text" name="bill_no" required class="bill_no font-weight-bolder form-control text-right ">
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

$(document).on('click', '.swap-bill-room-select', function() {
    var url = new URL(window.location.href);
    var selectedRoom = $(this).attr('data-room');
    var booking_no = url.searchParams.get("booking_no");
    var data = { "list_key": "get_ledger", "booking_no": booking_no }
    commonAjax('services.php', 'POST', data, '', '', '', {
        "functionName": "getroomnumbers",
        'param1': selectedRoom,
        'param2': booking_no
    });
});

function getroomnumbers(responce, selectedRoom, booking_no) {
    var roomNumber = [] = responce.result.booking_details.map((ele) => (ele.room_status == 'I' && ele.room_no != selectedRoom) ? ele.room_no : '');
    roomNumber = roomNumber.filter(function(entry) { return entry.trim() != ''; });
    if (roomNumber.length) {
        var roomNumberHtml = '';
        roomNumber.forEach(function(element) {
            roomNumberHtml += `<div class="swap-bill" data-refer-room='${selectedRoom}' data-booking-no='${booking_no}' data-room-no='${element}'>${element}</div>`;
        });
        $(".room-avaliblity").html(roomNumberHtml);
        $("#room-avaliblity").modal('show');
    } else {
        showToast('No rooms avaliable to swap the bill', 'error');
    }
}

/**
 * Swap Bill o another room 
 */
$(document).on('click', '.swap-bill', function() {
    var data = { "list_key": "Shiftbill", "room_no": $(this).attr('data-room-no'), "refer_room": $(this).attr('data-refer-room'), "booking_no": $(this).attr('data-booking-no') };
    commonAjax('services.php', 'POST', data, '', '', '', {
        "functionName": "locationReload"
    });
});

/**
 * Swap Room to another room
 */
$(document).on('click', '.btn-room-swap', function() {
    $("#room-swap").modal('show');
    $(".swap_room_no").val($(this).attr('data-room'));
});

/*  Room Number */

$(document).on('change blur', '.room_category,.to_date,.from_date', function() {
    if ($(this).closest('tr').find('.room_category').val()) {
        let data = {
            "list_key": "check_room_booking_available",
            "hotel_from_date": $(this).closest('tr').find('.from_date').val(),
            "hotel_to_date": $(this).closest('tr').find('.to_date').val(),
            "room_category": $(this).closest('tr').find('.room_category').val()
        }
        commonAjax('services.php', 'POST', data, '', '', '', { 'functionName': 'showRoomNumber', "param1": $(this).closest('tr').find('.room_no').attr('id') });

    }
});


function showRoomNumber(res, selector) {
    var selected = [];
    $(".room_no").each(function() {
        selected.push($(this).val());
    });

    var li = "<option value='' >Select a Room Number</option>";
    $.each(res.result, function(i, v) {
        li += `<option>${v}</option>`;
    });

    $("select#" + selector).html(li);
}


$(document).on('change', '.room_no', function() {
    var selected = [];
    $(".room_no").each(function() {
        selected.push($(this).val());
    });

    var count = 0;
    for (var i = 0; i < selected.length; ++i) {
        if (selected[i] == $(this).val())
            count++;
    }

    if (count > 1) {
        showToast('Room Number already selected', 'error');
        $(this).val("");
    }

});

/**
 * Price Clear for room category change
 */
$(document).on('change', '.room_category', function() {
    $(".price").val(' ');
});



/**
 * Discount Amount Calculation
 * @param {*} price Room Price
 * @param {*} discountPercentage 
 */

function discountAmountCalculation(price, discountPercentage, totalNoOfDays) {
    return emptySetToZero(((price / 100) * discountPercentage) * totalNoOfDays);
}

/**
 * Total Calculation
 */
$(document).on('change blur', '.room_category,.to_date,.from_date,.price,.cgst,.sgst,.discount', function() {
    var t = $(this).closest('tr');
    var fromDate = t.find('.from_date').val();
    var toDate = t.find('.to_date').val();
    var totalNoOfDays = dateClaculation(fromDate, toDate);
    t.find('.no_of_night').val(totalNoOfDays);
    var price = emptySetToZero(t.find('.price').val());
    var discount = emptySetToZero(t.find('.discount').val());
    var discountAmount = discountAmountCalculation(price, discount, totalNoOfDays);
    t.find('.discount-amount').val(discountAmount);
    var cgst = emptySetToZero(t.find('.cgst').val());
    var sgst = emptySetToZero(t.find('.sgst').val());
    var gst = cgst + sgst;
    var discountPrice = ((price * totalNoOfDays) - discountAmount);
    var total = emptySetToZero(discountPrice + (discountPrice / 100) * gst);
    t.find('.total').val(total);
});

$(document).on('click', '.room-swap', function() {
    let object = $("#room-swap-add").serializeObject();
    object['list_key'] = 'SwapRoom';
    object['booking_no'] = $(".booking-id").text();
    object['room_status'] = "1";
    console.log(object);
    commonAjax('services.php', 'POST', object, '', '', '', {
        "functionName": "locationReload"
    });
});

/**
 * Room Split Bill
 */

$(document).on('click', '.btn-split-bill', function() {
    var data = { "list_key": "get_ledger", "booking_no": booking_no };
    (room_no) ? data["room_no"] = room_no: '';
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "checkNoofRooms" });
});

function checkNoofRooms(res) {
    console.log(res);
    var roomInHouseCount = 0;
    res.result.booking_details.forEach(element => {
        (roomStatus(element.room_status).status == 'In House') ? roomInHouseCount++ : '';
    });

    $("#split-bill-modal").modal('show');
    var data = '';
    // (roomInHouseCount == '1') ? 

}