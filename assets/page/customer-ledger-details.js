var url = new URL(window.location.href);
var booking_no = url.searchParams.get("booking_no");
var room_no = url.searchParams.get("room_no");
var fullDetails = '';
displayCustomerListInit();
listPaymentType();
listRoomType('room_category');
listMealPlan();
let hTotal = 0;
let rTotal = 0;
let mTotal = 0;
var customerBookingDetails = '';
$(document).ready(function() {
    listCountry();
    listState($('#country').val());
    $('#country').select2().on('change', function() {
        listState($(this).val());
    })
    $('#state').select2().on('change', function() {
        listCity($(this).val());
    });
    if (room_no) {
        $('.btn-checkout').hide();
    }
});
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
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2Multiple", "param1": ".payment_mode", "param2": "payment_mode", "param3": "payment_master_id" });
}

/**
 * List Meal plan in select 2
 */

function listMealPlan() {
    let data = {
        "query": 'fetch',
        "databasename": 'meal_plan',
        "column": {
            "meal_plan_id": "meal_plan_id",
            "meal_plan_short": "meal_plan_short"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#meal_plan_id", "param2": "meal_plan_short", "param3": "meal_plan_id" })
}

/**
 * To List in Select2
 * @param {JSON} data 
 * @param {string} selector ID/Class name of the node
 * @param {String} Label for Select 2
 * @param {String} Value for Select 2
 */

function listSelect2Multiple(data, selector, jsonLabel, jsonValue) {
    let select2Data = [];
    let i = 1;
    data.forEach(element => {
        if (jsonValue)
            i = eval('element.' + jsonValue);
        select2Data.push({ 'id': i, 'text': eval('element.' + jsonLabel) })
        if (!jsonValue || typeof(jsonjsonValueKey) == 'undefined')
            i++;
    });
    $(selector).each(function(i) {
        $(this).select2({
            data: select2Data
        })
    })

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
        $(".bill-sample").attr('href', "/booking-print-sample.html?booking_no=" + booking_no + "&room_no=" + room_no);
    } else {
        var data = { "list_key": "get_ledger", "booking_no": booking_no };
        $(".bill-sample").attr('href', "/booking-print-sample.html?booking_no=" + booking_no);
    };
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayCustomerList", "param1": "table-customer-ledger" });
}

function displayCustomerList(response) {
    customerBookingDetails = response;
    fullDetails = response;
    var bookingArray = response.result.booking_details;
    var roomNo = bookingArray.map(x => x.room_no);
    var bookingDate = new Date(bookingArray[0].hotel_from_date).toString().split("GMT");
    $('h4.float-left').html("Ledger Details");
    let customerDom = ` <ul>
                            <li>
                                <p><b>Customer Name</b></p>
                                <p >${response.result.Booking[0].customer_fname}</p>
                                <p class="d-none customer-id">${response.result.Booking[0].customer_id}</p>
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
    lTotal = 0;
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
    rTotal = 0;
    var roomInHouseCount = 0;
    response.result.booking_details.forEach(element => {
        (roomStatus(element.room_status).status == 'In House') ? roomInHouseCount++ : '';
    })
    response.result.booking_details.forEach(element => {
        var action = '';
        if (roomStatus(element.room_status).status == 'In House') {
            if (!room_no && roomInHouseCount != 1)
                action = `<button type="button"  class="btn btn-icon btn-hover btn-sm btn-rounded swap-bill-room-select" data-room="${element.room_no}" data-type="swap"> <i class="anticon anticon-retweet font-size-20 text-primary" title="Bill Swap"></i> </button><button type="button"  class="btn btn-icon btn-hover btn-sm btn-rounded btn-room-swap" data-type="swap" data-room="${element.room_no}"> <i class="anticon anticon-warning font-size-20 text-warning" title="Room Swap"></i> </button><a href="customer-ledger-details.html?booking_no=${booking_no}&room_no=${element.room_no}" class="btn btn-icon btn-hover btn-sm btn-rounded" > <i class="anticon anticon-disconnect text-danger font-size-20" title="Split Bill"></i> </a>`;
            else
                action = `<button type="button"  class="btn btn-icon btn-hover btn-sm btn-rounded swap-bill-room-select" data-room="${element.room_no}" data-type="swap"><i class="anticon anticon-retweet font-size-20 text-primary" title="Bill Swap"></i> </button><button type="button"  class="btn btn-icon btn-hover btn-sm btn-rounded btn-room-swap" data-type="swap" data-room="${element.room_no}"> <i class="anticon anticon-warning font-size-20 text-warning" title="Room Swap"></i> </button><button type="button" class="btn btn-icon btn-hover btn-sm btn-rounded btn-split-bill" data-room="${element.room_no}" data-type="split"> <i class="anticon anticon-logout text-danger font-size-20" title="Split Bill"></i> </button>`;
        }

        if (checkdate(response.result.audit_date, element.hotel_from_date) && element.room_status == 'I') {
            action += `<button type="button" class="btn btn-icon btn-hover btn-sm btn-rounded btn-room-swap" data-type="edit" data-room="${element.room_no}"><i class="anticon anticon-edit font-size-20 text-primary" title="Edit"></i> </button>
            <button type="button" class="btn btn-icon btn-hover btn-sm btn-rounded btn-room-delete" data-room="${element.room_no}"><i class="anticon anticon-delete font-size-20 text-danger" title="Delete"></i> </button>`;
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
        let advanceBtn = '';
        if (element.status == 1) {
            if (checkdate(response.result.audit_date, element.created_at)) {
                advanceBtn = `  <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance" data-type="Advance" data-id="${element.bill_no}">
                                <i class="anticon anticon-edit  font-size-20 text-primary" title="Edit Advance"></i>
                            </button>
                            <button type="button" class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance-delete" data-id="${element.bill_no}"><i class="anticon anticon-delete font-size-20 text-danger" title="Delete"></i> </button>`;
            }
            advanceDetails += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${advanceDate[0]}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.bill_no}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.description} </td>
                            <td class="text-right border-right-0 border-bottom-0">${numberWithCommas(element.amount)}</td>
                            <td class="text-right border-right-0 border-bottom-0">
                                <a class="btn btn-icon btn-hover btn-sm btn-rounded" href="/advance-print.html?id=${element.bill_no}"  target="_blank" data-room="${element.room_no}" data-type="swap"> 
                                <i class="anticon anticon-printer  font-size-20 text-primary" title="Bill Swap"></i> </a>  
                                ${advanceBtn}                                                             
                            </td>
                        </tr>`;
            aTotal += Number(element.amount);
        }
    });
    advanceDetails += `<tr class="bg">
                            <td class="text-right border-right-0 border-bottom-0 font-size-20 font-weight-bolder" colspan='4'>Total</td>
                            <td class="text-right border-right-0 border-bottom-0 font-size-20 font-weight-bolder" >${numberWithCommas(aTotal)}</td>
                        </tr>`;
    $(".advance-details").html(advanceDetails);

    var HotelDetails = '';
    let hTotal = 0;
    response.result.Hotel.forEach(element => {
        var advanceBtn = '';
        var advanceDate = new Date(element.created_at).toString().split("GMT");
        if (element.status == 1) {
            if (checkdate(response.result.audit_date, element.created_at)) {
                advanceBtn = `  <button class="btn btn-icon btn-hover btn-sm btn-rounded btn-advance" data-type="Hotel" data-id="${element.customer_ledger_id}">
                                <i class="anticon anticon-edit  font-size-20 text-primary" title="Edit Hotel"></i>
                            </button>
                            <button type="button" class="btn btn-icon btn-hover btn-sm btn-rounded btn-ledger-delete" data-id="${element.customer_ledger_id}"><i class="anticon anticon-delete font-size-20 text-danger" title="Delete"></i> </button>`;
            }
            HotelDetails += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${advanceDate[0]}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.bill_no}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.description} </td>
                            <td class="text-right border-right-0 border-bottom-0">${numberWithCommas(element.amount)} </td>
                            <td class="text-right border-right-0 border-bottom-0">${advanceBtn}
                        </tr>`;
            hTotal += Number(element.amount);
        }
    });
    HotelDetails += `<tr class="bg">
    <td class="text-right border-right-0 border-bottom-0 font-size-20" colspan='4'>Total</td>
    <td class="text-right border-right-0 border-bottom-0 font-size-20" >${numberWithCommas(hTotal)}</td>
</tr>`;
    $(".hotel-details").html(HotelDetails);


    var mealsDetails = '';
    mTotal = 0;
    var actionMeal = '';
    if (response.result.Booking) {
        response.result.Booking.forEach(element => {
            if (checkdate(response.result.audit_date, element.created_at)) {
                actionMeal = `  <button class="btn btn-icon btn-hover btn-sm btn-rounded edit-meal">
                                    <i class="anticon anticon-edit font-size-20 text-primary" title="Edit Meal"></i>
                                </button>`;
            }
            mealsDetails = `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${element.meal_plan_full}</td>
                            <td class="text-center border-right-0 border-bottom-0">${numberWithCommas(element.meal_price)}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.meal_count}</td>
                            <td class="text-right border-right-0 border-bottom-0">${numberWithCommas(element.meal_total)}</td>
                            <td class="text-right border-right-0 border-bottom-0">${actionMeal}</td>
                        </tr>`;
            mTotal = Number(element.meal_total);
        });

        $(".meals-details").html(mealsDetails);
    }

    /**
     * Summary
     */

    let summary = ` <div class="card-header"> <h3 class="p-2 p-l-0 m-0">Summary</h3> </div> 
                    <div class="card-body p-0"> 
                        <div class="list" data-id="v-pills-leadger-tab"> <p> Room Rent </p> <p>${ numberWithCommas(lTotal)} </p></div>                        
                        <div class="list" data-id="v-pills-leadger-tab"> <p> Hotel Bill </p> <p>${ numberWithCommas(hTotal)} </p></div>
                        <div class="list" data-id="v-pills-leadger-tab"> <p> Advance  </p> <p>${ numberWithCommas(aTotal)} </p></div>
                        <div class="list" data-id="v-pills-leadger-tab"> <p> Meal Total </p> <p>${ numberWithCommas(mTotal)} </p></div>
                        <div class="list font-size-16 font-weight-bold" data-id="v-pills-leadger-tab"> <p> Total </p> <p>${ numberWithCommas(lTotal-aTotal+hTotal + mTotal)} </p></div>
                    </div>`;

    $(".summary").html(summary);
}

$(document).on('click', '.swap-bill-room-select,.btn-split-bill', function() {
    var url = new URL(window.location.href);
    var selectedRoom = $(this).attr('data-room');
    var booking_no = url.searchParams.get("booking_no");
    var roomSwapOrSplitBill = $(this).attr('data-type');
    var data = { "list_key": "get_ledger", "booking_no": booking_no };
    commonAjax('services.php', 'POST', data, '', '', '', {
        "functionName": "getroomnumbers",
        'param1': selectedRoom,
        'param2': booking_no,
        'param3': roomSwapOrSplitBill
    });
});

function getroomnumbers(responce, selectedRoom, booking_no, type) {
    var roomNumber = [] = responce.result.booking_details.map((ele) => (ele.room_status == 'I' && ele.room_no != selectedRoom) ? ele.room_no : '');
    roomNumber = roomNumber.filter(function(entry) { return entry.trim() != ''; });
    if (roomNumber.length) {
        if (type == 'swap') {
            var roomNumberHtml = '';
            roomNumber.forEach(function(element) {
                roomNumberHtml += `<div class="swap-bill" data-refer-room='${selectedRoom}' data-booking-no='${booking_no}' data-room-no='${element}'>${element}</div>`;
            });
            $(".room-avaliblity").html(roomNumberHtml);
            $("#room-avaliblity").modal('show');
        } else if (type == 'split') {
            $("#split-bill-modal").modal('show');
        }
    } else {
        (type == 'swap') ? showToast('No rooms avaliable to swap the bill', 'error'): showToast('Only one room avalible so cant able to split the bill', 'error');
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
    var data = { "list_key": "get_ledger", "booking_no": booking_no, "room_no": $(this).attr('data-room') };
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "roomSwapSetValue", "param1": $(this).attr('data-type') });
});


/**
 * Add Room
 */

$(document).on('click', '.hotel-room-add', function() {
    $(".room-swap").attr('data-type', "add");
});


/**
 * Edit Meal
 */

$(document).on('click', '.edit-meal', function() {
    $("#meal-edit").modal('show');
    let meal = customerBookingDetails.result.Booking[0];
    $("#meal_plan_id").val(meal.meal_plan_id).trigger('change');
    $('[name="meal_price"]').val(meal.meal_price);
    $('[name="meal_count"]').val(meal.meal_count);
    $('[name="meal_total"]').val(meal.meal_total);
});

$(document).on('click', '.btn-meal-save', function() {
    if (checkRequired('#meal-edit-form')) {
        let object = $("#meal-edit-form").serializeObject();
        object['list_key'] = 'updateMeal';
        object['booking_no'] = $(".booking-id").text();
        commonAjax('services.php', 'POST', object, '', '', '', {
            "functionName": "locationReload"
        });
    }

})

/**
 * Delete Room
 */

$(document).on('click', '.btn-room-delete', function() {
    if (confirm("Are you sure want to delete the room?")) {
        let object = { "list_key": "DeleteBookingLedger", "booking_no": $(".booking-id").text(), "room_no": $(this).attr('data-room') }
        commonAjax('services.php', 'POST', object, '', '', '', {
            "functionName": "locationReload"
        });
    }
});


/**
 * Delete ledger
 */

$(document).on('click', '.btn-ledger-delete', function() {
    if (confirm("Are you sure want to delete?")) {
        let object = { "list_key": "ledgerStatus", "customer_ledger_id": $(this).attr('data-id'), "status": 0 }
        commonAjax('services.php', 'POST', object, '', '', '', {
            "functionName": "locationReload"
        });
    }
});

/**
 * Delete advance
 */

$(document).on('click', '.btn-advance-delete', function() {
    if (confirm("Are you sure want to delete the advance?")) {
        let object = { "list_key": "remove_advance", "bill_no": $(this).attr('data-id') }
        commonAjax('services.php', 'POST', object, '', '', '', {
            "functionName": "locationReload"
        });
    }
});

/**
 * 
 * @param {*} res 
 * @param {*} type 
 */

function roomSwapSetValue(res, type) {
    let swapDate = res.result.booking_details[0];
    $("#room-swap-add .room_category").val(0).trigger('change');
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    $("#room-swap-add .current_date").val(now.toISOString().slice(0, 16));
    $("#room-swap-add .to_date").val(swapDate.hotel_to_date.replace(" ", "T").replace(":00", ""));
    if (type == 'edit') {
        $("#room-swap-add .room_category").val(swapDate.room_category_id).trigger('change');
        setTimeout(() => {
            $("#room-swap-add #room_no").append(`<option value="${swapDate.room_no}" selected>${swapDate.room_no}</option>`)
            $("#room-swap-add #room_no").val(swapDate.room_no);
            $(".room-swap").attr('data-type', "edit");
            $("#room-swap-add .current_date").val(swapDate.hotel_from_date.replace(" ", "T").replace(":00", ""));
        }, 1500);
    }
    $("#room-swap-add .no_of_adults").val(swapDate.hotel_no_of_adults);
    $("#room-swap-add .no_of_childs").val(swapDate.hotel_no_of_childs);
    $("#room-swap-add [name='hotel_no_of_extra_bed']").val(swapDate.hotel_no_of_adults);
    $("#room-swap-add [name='hotel_price']").val(swapDate.hotel_price);
    $("#room-swap-add [name='hotel_discount']").val(swapDate.hotel_discount);
    $("#room-swap-add [name='discount_amount']").val(swapDate.discount_amount);
    $("#room-swap-add [name='hotel_cgst']").val(swapDate.room_cgst);
    $("#room-swap-add [name='hotel_sgst']").val(swapDate.room_sgst);
    $("#room-swap-add [name='room_total']").val(swapDate.room_total);



}

/*  Room Number */

$(document).on('change blur', '.room_category,.no_of_night,.from_date', function() {
    if ($(this).closest('tr').find('.room_category').val()) {
        //let data = { "list_key": "check_room_booking_available", "hotel_from_date": $(this).closest('tr').find('.from_date').val(), "hotel_to_date": $(this).closest('tr').find('.to_date').val(), "room_category": $(this).closest('tr').find('.room_category').val() }
        let data = {
            "query": 'fetch',
            "databasename": 'room_master',
            "column": {
                "*": "*"
            },
            "condition": {
                "room_category_id": $(this).closest('tr').find('.room_category').val(),
                "current_status": 'A'
            },
            "like": ""
        }
        commonAjax('database.php', 'POST', data, '', '', '', { 'functionName': 'showRoomNumber', "param1": $(this).closest('tr').find('.room_no').attr('id') }, { 'functionName': 'showRoomNumber', "param1": $(this).closest('tr').find('.room_no').attr('id') });
    }
});

function showRoomNumber(res, selector) {
    var selected = [];
    $(".room_no").each(function() {
        selected.push($(this).val());
    });
    var li = "<option value='' >Select a Room Number</option>";
    $.each(res, function(i, v) {
        li += `<option>${v.room_no}</option>`;
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
    if ($(this).attr('data-type') == 'edit') {
        object['list_key'] = 'updateBooking';
    }
    if ($(this).attr('data-type') == 'add') {
        object['list_key'] = 'LedgerBookingInsert';
    }
    commonAjax('services.php', 'POST', object, '', '', '', {
        "functionName": "locationReload"
    });
});


/**
 * Full Checkout 
 */

$(document).on('click', '.btn-full-checkout', function() {
    if (checkRequired('#checkout-full')) {
        let data = {
            "list_key": "FinalCheckout",
            "customer_id": $('.customer-id').html(),
            "total_received": $("#checkout .advance").val(),
            "total_amount": lTotal + hTotal,
            "payment_type": $("#checkout #payment_mode").val(),
            "booking_no": $('.booking-id').html()
        }
        commonAjax('', 'POST', data, '', 'Checkout Successfully', '', { 'functionName': 'redirectToPrint' });
    }
});

function redirectToPrint(res) {
    console.log(res);
    window.open('/booking-print.html?invoice_id=' + res.result, '_self');
}

/**
 * Set value to Customer field
 */
function addCustomer() {
    // Add New
    var data = {
        "query": 'add',
        "databasename": 'customer_master',
        "values": $("#customer-add").serializeObject()
    }
    commonAjax('', 'POST', data, '#customer-add', 'Customer added successfully');
}

/**
 * Add Customer
 */

$('.btn-save').click(function() {
    if (checkRequired('#customer-add')) {
        let object = $("#customer-add").serializeObject();
        var id = object['customer_id'];
        delete object['customer_id'];
        if (isEmptyValue(id)) {
            // Add New
            var data = {
                "query": 'add',
                "databasename": 'customer_master',
                "values": object
            }
            commonAjax('database.php', 'POST', data, '', 'Customer added successfully', '', { 'functionName': 'customerUpdateRequest', 'param1': true });
        } else {
            // Edit
            var data = {
                "query": 'update',
                "databasename": 'customer_master',
                "values": object,
                "condition": {
                    "customer_id": id
                }
            }
            commonAjax('database.php', 'POST', data, '', 'Customer updated successfully', '', { 'functionName': 'checkout' });
        }
    }
});

function customerUpdateRequest(responce, customerFlag) {
    if (customerFlag) {
        let data = {
            "query": 'fetch',
            "databasename": 'customer_master',
            "column": {
                "customer_id": "customer_id"
            },
            "condition": {
                "status": '1',
                "customer_phone": $('[name = "customer_phone"]').val()
            },
            "like": ""
        }
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "setValueToCustomerField" });
    } else {
        checkout();
    }
}

function setValueToCustomerField(responce) {
    $.each(responce[0], function(i, v) {
        setValue(i, v);
    });
    checkout();
}

function checkout() {
    if (checkRequired('#checkout-full-split')) {
        let data = {
            "list_key": "FinalCheckout",
            "customer_id": $('.customer-id').html(),
            "total_received": $("#checkout-full-split .advance").val(),
            "total_amount": lTotal + hTotal,
            "payment_type": $("#checkout #payment_mode").val(),
            "booking_no": $('.booking-id').html(),
            "room_no": $('.room-no').html()
        }
        commonAjax('', 'POST', data, '', 'Checkout Successfully', '', { 'functionName': 'redirectToPrint' });
    }
}

/**
 * Get Customer Details
 */

$(document).on('blur', '[name = "customer_phone"]', function() {
    $(".image-prev-area").html(' ');
    $('[name=customer_doc]').val(null)
    if ($(this).val().length == 10) {
        let data = {
            "query": 'fetch',
            "databasename": 'customer_master',
            "column": {
                "*": "*"
            },
            "condition": {
                "status": '1',
                "customer_phone": $(this).val()
            },
            "like": ""
        }
        commonAjax('database.php', 'POST', data, '', 'Customer Updated', '', { "functionName": "multipleSetValue", "param1": true })
    } else {
        $(this).addClass('is-invalid');
        showToast("Enter Valid Phone No", "error");
    }
})