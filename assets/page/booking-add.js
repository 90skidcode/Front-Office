$(document).ready(function() {
    listAgent();
    listCountry();
    listMealPlan();
    listPaymentType();
    listState($('#country').val());
    $('#country').select2().on('change', function() {
        listState($(this).val());
    })
    $('#state').select2().on('change', function() {
        listCity($(this).val());
    });
    listRoomType('room_category');
    setCurrentDate('current_date');

    /*
     * Check Edit or Add
     */

    checkEditorAddCheckin('booking_master_new', 'booking_master_id');

    function checkEditorAddCheckin(databasename, conditionkey, imageFlag) {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        var type = url.searchParams.get("type");
        if (!isEmptyValue(id) && type == 'checkout') {
            let data = { "list_key": "booking_detail", "booking_no": id };
            let flag = false;
            if (imageFlag && typeof(imageFlag) != 'undefined') {
                flag = true;
            }
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setCheckinValue" })
        } else if (!isEmptyValue(id) && type == 'reservation') {
            let data = { "list_key": "reservation_detail", "reservation_no": id };
            let flag = false;
            if (imageFlag && typeof(imageFlag) != 'undefined') {
                flag = true;
            }
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setCheckinValueByReservation" });
            $('.reservation_no').val(id);
            data = { "list_key": "list_general_tables", "table_name": "booking_master_new", "column": "count(1)", "like": "", "limit": "1" }
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setCheckinNo" });
        } else if (!isEmptyValue(id)) {
            let data = { "list_key": "booking_detail", "booking_no": id };
            let flag = false;
            if (imageFlag && typeof(imageFlag) != 'undefined') {
                flag = true;
            }
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setCheckinValue" })
        } else {
            let data = { "list_key": "list_general_tables", "table_name": "booking_master_new", "column": "count(1)", "like": "", "limit": "1" }
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setCheckinNo" });
        }
    }
    $('[readonly]').prop('tabindex', '-1');
});

/**
 * Set Checkin Value for Reservation to Booking
 * @param {JSON} responce 
 */

function setCheckinValue(responce) {
    console.log(responce);
    $.each(responce.result.master[0], function(i, v) {
        $('[name="' + i + '"]').val(v);
        if ($('[name="' + i + '"]').hasClass('select2'))
            $('[name="' + i + '"]').trigger('change');
    })

    $('#meal_plan_id').val(responce.result.master[0].meal_plan_id);
    $('#meal_plan_id').hasClass('select2');
    $('#meal_plan_id').trigger('change');

    $.each(responce.result.details, function(index, value) {
        if (index)
            $('#button-add-item').trigger('click');
        $(".room_no_row").html('<input type="number" name="room_no" autocomplete="off" required="required" data-item="room_no" readonly class="form-control text-right  float-left">');
        $('.action-btn').html(`<button type="button"  class="btn btn-icon room-change btn-lg">
                                <i class="anticon anticon-retweet"></i>
                            </button>`);
    })

    $.each(responce.result.details, function(index, value) {
        setTimeout(function() {
            $.each(value, function(i, v) {
                var v = v;
                if (i == 'hotel_from_date' || i == 'hotel_to_date')
                    v = v.replace(" ", "T").replace(":00", "");
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
                if ($('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').hasClass('select2'))
                    $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').trigger('change');
                if (i == 'room_status' && v == "S") {
                    $('tbody tr:nth-child(' + (index + 1) + ') .action-btn').html(' ');
                    $('tbody tr:nth-child(' + (index + 1) + ')').find('input').prop('readonly', true);
                    $('tbody tr:nth-child(' + (index + 1) + ')').find('select').closest('td').css({ 'pointer-events': 'none', 'cursor': 'not-allowed' });
                }
            })
            $('[name="meal_count"]').trigger('blur');
        }, 2000);
    })

    docShow(true);

    $('[name="advance"]').prop('readonly', true);
    $('.paymentmode').html(' ');
    $('.remarks').val('');
}


/**
 * Set Checkin Value for Normal Booking
 * @param {JSON} responce 
 */

function setCheckinValueByReservation(responce) {
    console.log(responce);

    $.each(responce.result.master[0], function(i, v) {
        $('[name="' + i + '"]').val(v);
        if ($('[name="' + i + '"]').hasClass('select2'))
            $('[name="' + i + '"]').trigger('change');
    })

    $('#meal_plan_id').val(responce.result.master[0].meal_plan_id);
    $('#meal_plan_id').hasClass('select2');
    $('#meal_plan_id').trigger('change');

    var addCount = 1;

    $.each(responce.result.details, function(index, value) {
        for (var i = 0; i < Number(value.hotel_no_of_rooms); i++) {
            if (index || i)
                $('#button-add-item').trigger('click');
        }
    });

    $.each(responce.result.details, function(index, value) {
        setTimeout(function() {
            for (var c = 0; c < Number(value.hotel_no_of_rooms); c++) {
                $.each(value, function(i, v) {
                    var v = v;
                    if (i == 'hotel_from_date' || i == 'hotel_to_date')
                        v = v.replace(" ", "T").replace(":00", "");
                    $('tbody tr:nth-child(' + (addCount) + ') [name="' + i + '"]').val(v);
                    if ($('tbody tr:nth-child(' + (addCount) + ') [name="' + i + '"]').hasClass('select2'))
                        $('tbody tr:nth-child(' + (addCount) + ') [name="' + i + '"]').addClass('no-trigger').trigger('change');
                    if (i == 'room_status' && v == "S") {
                        $('tbody tr:nth-child(' + (addCount) + ') .action-btn').html(' ');
                        $('tbody tr:nth-child(' + (addCount) + ')').find('input').prop('readonly', true);
                        $('tbody tr:nth-child(' + (addCount) + ')').find('select').closest('td').css({ 'pointer-events': 'none', 'cursor': 'not-allowed' });
                    }
                })
                addCount++;
                setTimeout(function() {
                    $('.no_of_night').trigger('blur');
                    $('.room_sgst').trigger('blur');
                }, 200);

            }
            $('[name="meal_count"]').trigger('blur');
            $('.no_of_adults').val('');
            $('.no_of_childs').val('');
        }, 2000);
    })
    docShow(true);
    $('[name="advance"]').prop('readonly', true);
    $('.paymentmode').html(' ');
    $('.remarks').val('');
    $('.room_sgst').trigger('blur');
}

/**
 * Setting booking No
 * @param {JSON} responce 
 */
function setCheckinNo(responce) {
    $.each(responce.result[0], function(i, v) {
        let count = Number(v) + 1;
        setValue('booking_no', "CHK" + count)
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
 * List Room Type in select 2
 */

function listAgent() {
    let data = {
        "query": 'fetch',
        "databasename": 'travel_agency',
        "column": {
            "travel_agency_name": "travel_agency_name",
            "travel_agency_id": "travel_agency_id"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#travel_agency_id", "param2": "travel_agency_name", "param3": "travel_agency_id" })
}

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

/**
 * Select Meal Price Update
 */

$(document).on('change', '#meal_plan_id', function() {
    if ($(this).val()) {
        let data = {
            "query": 'fetch',
            "databasename": 'meal_plan',
            "column": {
                "*": "*"
            },
            "condition": {
                "status": '1',
                "meal_plan_id": $(this).val()
            },
            "like": ""
        }
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "mealPriceUpdate", "param1": "meal_plan_id" }, { "functionName": "mealCalculationClear" });
    } else
        mealCalculationClear();
})

$(document).on('blur', '[name = "meal_price"],[name = "meal_count"],[name = "meal_total"]', function() {
    taxAmountCalculation();
})

function mealPriceUpdate(responce, id) {
    $("[name=meal_price]").val(responce[0].meal_price);
    taxAmountCalculation();
}

function mealCalculationClear() {
    $("[name=meal_price]").val(0);
    $('[name="meal_count"]').val(0);
    $('[name="meal_total"]').val(0);
    taxAmountCalculation();
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


$(document).on('click', '#button-add-item', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1);

    $('#addItem').before(`<tr>
                            <td class="text-center border-right-0 border-bottom-0 action-btn">
                                <button type="button" data-toggle="tooltip" title="Delete" class="btn btn-icon btn-outline-danger btn-lg">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                            <td>
                                <select class="select2 room_category" id="room_${c}_category" name="room_category" required>
                                    <option  value="">Select a Room Type</option>
                                </select>
                            </td>
                            <td  class="hide" hidden>
                                <input type="number" name="hotel_no_of_night" data-getdate="current_date${c}" data-setdate="set_date${c}" autocomplete="off" data-item="no_of_night" class="no_of_night form-control text-right">
                                <input type="hidden" name="room_status" data-getdate="current_date" data-setdate="set_date" autocomplete="off" value="I" data-item="room_status" class="room_status form-control text-right">               
                            </td>
                            <td>
                                <input type="datetime-local" name="hotel_from_date" autocomplete="off" required="required" data-item="from_date" class="from_date current_date${c} form-control text-right">
                                <input type="datetime-local" name="hotel_to_date" autocomplete="off" required="required" data-item="to_date" class="to_date set_date form-control text-right">
                            </td>
                            <td class="room_no_row">
                                <select class="room_no form-control" id="room_no_${c}" name="room_no" required>
                                    <option  value="">Select a Room No</option>
                                </select>
                            </td>
                            <td>
                            <input type="number" name="hotel_no_of_adults" autocomplete="off" required="required" data-item="no_of_adults" class="no_of_adults form-control text-right">
                            <input type="number" name="hotel_no_of_childs" autocomplete="off" required="required" data-item="no_of_childs" class="no_of_childs form-control text-right">
                        </td>
                        <td hidden>
                            <input type="text" name="hotel_no_of_extra_bed" required="required" value="0" class="form-control text-right">
                        </td>
                        <td>
                            <input type="number" name="hotel_price" autocomplete="off" required="required" data-item="price" class="price form-control text-right">
                        </td>
                        <td>
                            <input type="number" name="hotel_discount" autocomplete="off" value="0" required="required" data-item="discount" class="discount form-control text-right">
                            <input type="text" name="discount_amount" tabindex="-1" name autocomplete="off" value="0" readonly data-item="discount-amount" class="discount-amount form-control text-right">
                        </td>
                        <td>
                            <input type="text" name="room_cgst" autocomplete="off" required="required" data-item="cgst" class="room_cgst form-control text-right">
                            <input type="text" name="room_sgst" autocomplete="off" required="required" data-item="sgst" class="room_sgst form-control text-right">
                        </td>

                        <td>
                            <div class="gst_details" data-gst="0"></div>
                            <input type="text" readonly name="room_total" class="total form-control text-right border-0">
                            <input type="hidden" name="room_status" value="I">
                        </td>
                        </tr>`);
    listRoomType('room_' + c + '_category');
})

/**
 * To delete a row
 */

$(document).on('click', '.btn-outline-danger', function() {
    if ($("#button-add-item").attr('count') != '1') {
        $(this).closest('tr').remove();
        $("#button-add-item").attr('count', parseInt($("#button-add-item").attr('count')) - 1);
        taxAmountCalculation();
    }
})


/**
 * Set no no nights
 */

$(document).on('keyup blur', '.to_date,.from_date', function() {
    var t = $(this).closest('tr');
    var fromDate = t.find('.from_date').val();
    var toDate = t.find('.to_date').val();
    var totalNoOfDays = dateClaculation(fromDate, toDate);
    t.find('.no_of_night').val(totalNoOfDays);
})

/**
 * To get room type id
 */

$(document).on('change', '.select2.room_category', function() {
    let data = {
        "query": 'fetch',
        "databasename": 'room_category',
        "column": {
            "*": "*"
        },
        "condition": {
            "room_category_id": $(this).val()
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "setJsonToRow", "param1": $(this) }, { "functionName": "removeJsonToRow", "param1": $(this) })
});

/**
 * Room details Calculation
 */

$(document).on('keyup blur change', '.price,.from_date,.to_date,.no_of_rooms,.no_of_adults,.no_of_childs,.room_cgst,.room_sgst,.discount', function() {
    try {
        let ele = $(this).closest('tr');
        let adultsCount = emptySetToZero(ele.find('.no_of_adults').val());
        let infantsCount = emptySetToZero(ele.find('.no_of_childs').val());
        let noofrooms = emptySetToZero(ele.find('.no_of_rooms').val());
        let noofnights = emptySetToZero(ele.find('.no_of_night').val());
        let hotelCgst = emptySetToZero(ele.find('.room_cgst').val());
        let hotelSgst = emptySetToZero(ele.find('.room_sgst').val());
        let hotelCgstAmount = 0;
        let hotelSgstAmount = 0;
        if (!noofnights)
            noofnights = 1;
        let json = ele.attr('data-json');
        if (json) {
            json = JSON.parse(json);
            let adult = emptySetToZero(json[0].room_capacity_adults);
            let infant = emptySetToZero(json[0].room_capacity_infant);
            let price = emptySetToZero(ele.find('.price').val());
            let extra = emptySetToZero(json[0].room_extra_bed_price);
            let extraadult = (noofrooms * adult) - adultsCount;
            let extrainfant = (noofrooms * infant) - infantsCount;
            let roomPrice = noofnights * price;
            let discountPercentage = emptySetToZero(ele.find('.discount').val());
            (discountPercentage) ? ele.find('.discount-amount').val(((ele.find('.price').val() / 100) * discountPercentage).toFixed(2)): ele.find('.discount-amount').val(0);
            let amountAfterDiscount = (roomPrice - ele.find('.discount-amount').val()).toFixed(2);
            (hotelCgst) ? hotelCgstAmount = ((amountAfterDiscount / 100) * hotelCgst).toFixed(2): 0.00;
            (hotelSgst) ? hotelSgstAmount = ((amountAfterDiscount / 100) * hotelSgst).toFixed(2): 0.00;
            ele.find('.gst_details').html(`CGST  : Rs.${hotelCgstAmount} <br> SGST : Rs.${hotelSgstAmount}`).attr(
                'data-gst', (Number(hotelCgstAmount) + Number(hotelSgstAmount))
            );
            ele.find('.total').val((Number(amountAfterDiscount) + Number(hotelCgstAmount) + Number(hotelSgstAmount)).toFixed(2));
            taxAmountCalculation();
        }
    } catch (e) {
        console.log(e);
    }
});


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
        commonAjax('database.php', 'POST', data, '', '', '', { 'functionName': 'showRoomNumber', "param1": $(this).closest('tr').find('.room_no').attr('id') });
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


function taxAmountCalculation() {
    let totalAmountBeforeTax = 0;
    $(".price").each(function(i, v) {
        let ele = $(this).closest('tr');
        let noofrooms = 1;
        let noofnights = emptySetToZero(ele.find('.no_of_night').val());
        let price = emptySetToZero(ele.find('.price').val());
        let roomPrice = noofnights * (noofrooms * price);
        let amountAfterDiscount = (roomPrice - ele.find('.discount-amount').val()).toFixed(2);
        totalAmountBeforeTax += Number(amountAfterDiscount);
    });
    let gst = 0;
    $(".gst_details").each(function(i, v) {
        gst = gst + (Number($(this).attr('data-gst')));
    });
    let totaldiscount = 0;
    $(".discount-amount").each(function(i, v) {
        totaldiscount = totaldiscount + Number($(this).val());
    });
    $(".totaldiscount").val(totaldiscount.toFixed(2));
    $(".beforetaxtotal").val(totalAmountBeforeTax.toFixed(2));
    $('.gst').val(gst.toFixed(2));
    let total = (emptySetToZero(Math.round(Number(totalAmountBeforeTax) + Number($(".gst").val()) + Number($(".meal_total").val()))));
    $(".aftertaxamount").val(total.toFixed(2));
    if (total) {
        $(".words").html('<b>Total Amount Words</b>');
        $(".amountinwords").html(inWords(total));
    } else {
        $(".words").html(' ');
        $(".amountinwords").html(' ');
    }
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
            commonAjax('database.php', 'POST', data, '', 'Customer updated successfully', '', { 'functionName': 'addCheckin' });
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
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "setValueToCustomerField" })
    } else {
        addCheckin();
    }
}

function setValueToCustomerField(responce) {
    $.each(responce[0], function(i, v) {
        setValue(i, v);
        addCheckin();
    })
}

function addCheckin() {
    if (checkRequired('#booking-add')) {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        var type = url.searchParams.get("type");
        var object = {};
        if ($("#button-add-item").attr('count') != '1') {
            object = $("#booking-add").serializeObject();
        } else {
            object['meal_plan_id'] = $('[name="meal_plan_id"]').val();
            object['meal_price'] = $('[name="meal_price"]').val();
            object['meal_count'] = $('[name="meal_count"]').val();
            object['meal_total'] = $('[name="meal_total"]').val();
            $("tr.insertroom .form-control").each(function() {
                object[$(this).attr('name')] = [$('[name=' + $(this).attr('name') + ']').val()];
            });
            $("tr:not(.insertroom) input").each(function() {
                object[$(this).attr('name')] = $('[name=' + $(this).attr('name') + ']').val();
            });
            object['room_category'] = $(".room_category").val();
            if (isEmptyValue(id) || type == 'reservation') {
                object['payment_mode'] = $("#payment_mode").val();
                object['advance'] = $(".advance").val();
                object['remarks'] = $(".remarks").val();
            }
            object['remarks'] = $(".remarks").val();
        }
        delete object['status'];
        object['type'] = $('[name="type"]').val();
        object['customer_id'] = $('[name="customer_id"]').val();
        object['booking_no'] = $(".booking_no").val();
        object['booking_type'] = $(".booking_type").val();
        object['travel_agency_id'] = $("#travel_agency_id").val();
        object['reservation_no'] = $(".reservation_no").val();
        object['travel_agency_transaction_no'] = $("#travel_agency_transaction_no").val();
        object['list_key'] = 'booking_room_insert';
        if (isEmptyValue(id) || type == 'reservation') {
            commonAjax('', 'POST', object, '', 'Checkin added successfully', '', { 'functionName': 'redirectToListing' });
        } else {
            object['list_key'] = 'booking_update';
            console.log(JSON.stringify(object));
            commonAjax('', 'POST', object, '', 'Checkin updated successfully', '', { 'functionName': 'redirectToListing' });
        }
    }
}

/**
 * Redirect To Listing
 */
function redirectToListing() {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    var type = url.searchParams.get("type");
    if (!isEmptyValue(id) && !type) {
        window.location = 'booking-amend-list.html';
    } else if (!isEmptyValue(id) && type == 'reservation') {
        window.location = 'booking-list.html';
    }

    /*$("#booking-add")[0].reset();
    $("#customer-add")[0].reset();
    $(".words").html(' ');
    $(".amountinwords").html(' ');
    let data = { "list_key": "list_general_tables", "table_name": "booking_master", "column": "count(1)", "condition": { "status": "R" }, "like": "", "limit": "1" }
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setCheckinNo" });*/
}


/**
 * File Upload
 */
var uploadData = $('[name=customer_doc]').val().split(",");
$(document).ready(function() {
    uploadData = $('[name=customer_doc]').val().split(",");
    $('input[type="file"]').change(function() {
        $(".btn-save").prop('disabled', true);
        var formData = new FormData();
        formData.append('file', $('#upload')[0].files[0]);
        let randomClass = randomString(16, 'aA');
        let html = ` <div class="col-md-3 ${randomClass}" data-val="">
                        <span class="badge-danger float-right border-radius-round position-absolute pointer remove-img" title="remove">
                            <span class="icon-holder d-none">
                                <i class="anticon anticon-close"></i>
                            </span>
                        </span>
                        <img class="w-100" src="" alt="">
                        <div class="progress">
                            <div class="progress-bar progress-bar-animated bg-success" role="progressbar" style="width: 0%"></div>
                        </div>
                    </div>`;
        $(".image-prev-area").append(html);
        $(".image-prev-area").removeClass('d-none');
        readURL(this, randomClass);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $("." + randomClass + " .progress-bar").css({
                            width: percentComplete + "%"
                        })
                        if (percentComplete === 100) {

                        }
                    }
                }, false);
                return xhr;
            },
            url: 'https://glowmedia.in/frontoffice/admin/api/upload.php',
            type: 'POST',
            data: formData,
            success: function(data) {
                $(".btn-save").prop('disabled', false);
                let dataResult = JSON.parse(data);
                $("#upload").val(null);
                $("." + randomClass + " .icon-holder").removeClass('d-none');
                if (dataResult.status_code == 200) {
                    showToast(dataResult.message, 'success');
                    uploadData.push(dataResult.result);
                    $("." + randomClass).attr('data-val', dataResult.result);
                } else {
                    showToast(dataResult.message, 'error');
                }
                uploadData = uploadData.filter(function(e) { return e });
                $('[name=customer_doc]').val(uploadData.toString());
            },
            error: function(data) {
                $(".btn-save").prop('disabled', false);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
});

$(document).on('click', '.image-prev-area .remove-img', function() {
    var value = $(this).closest('div').attr('data-val');
    uploadData = $('[name=customer_doc]').val().split(",");
    if (value) {
        uploadData = removeItemOnce(uploadData, value);
        uploadData = uploadData.filter(function(e) { return e });
        $('[name=customer_doc]').val(uploadData.toString());
    }
    $(this).closest('div').remove();
    showToast("File removed successfully", 'success');
})

/**
 * Room Change
 */

$(document).on('click', '.room-change', function() {
    const currentDate = new Date();
    const toDate = new Date($(this).closest('tr').find('.to_date').val());
    if (currentDate < toDate) {
        $(this).closest('tr').find('input').prop('readonly', true);
        $(this).closest('tr').find('.room_status').val("S");
        $(this).closest('tr').find('select').closest('td').css({ 'pointer-events': 'none', 'cursor': 'not-allowed' });
        const date1 = new Date($(this).closest('tr').find('.from_date').val());
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");
        console.log(diffTime > 86399999);
        (diffTime > 86399999) ? $(this).closest('tr').find('.no_of_night').val(diffDays): $(this).closest('tr').find('.no_of_night').val(0);
        $('#button-add-item').trigger('click');

        var length = $(".btn-outline-danger").length;
        $(".btn-outline-danger")[length - 1].remove();
    } else {
        showToast("Can't able to Change Room to date is lower", 'error');
    }
})