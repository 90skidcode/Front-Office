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

    checkEditorAddReservation('reservation_master_new', 'reservation_master_id');

    function checkEditorAddReservation(databasename, conditionkey, imageFlag) {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        if (!isEmptyValue(id)) {
            let data = { "list_key": "reservation_detail", "reservation_no": id };
            let flag = false;
            if (imageFlag && typeof(imageFlag) != 'undefined') {
                flag = true;
            }
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setReservationValue" })
        } else {
            let data = { "list_key": "list_general_tables", "table_name": "reservation_master_new", "column": "count(1)", "like": "", "limit": "1" }
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setReservationNo" });
        }
    }
    $('[readonly]').prop('tabindex', '-1');
});

/**
 * Set Reservation Value
 * @param {JSON} responce 
 */

function setReservationValue(responce) {
    $.each(responce.result.master[0], function(i, v) {
        setValue(i, v);
    })
    $.each(responce.result.details, function(index, value) {
        if (index)
            $('#button-add-item').trigger('click');
    })

    $.each(responce.result.details, function(index, value) {
        setTimeout(function() {
            $.each(value, function(i, v) {
                var v = v;
                if (i == 'hotel_from_date' || i == 'hotel_to_date')
                    v = v.replace(" ", "T").replace(":00", "");
                $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').val(v);
                if ($('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').hasClass('select2')) {
                    $('tbody tr:nth-child(' + (index + 1) + ') [name="' + i + '"]').addClass('no-trigger').trigger('change');
                }

            })
        }, 2000);
    });

    docShow(true);

    $('[name="advance"]').prop('readonly', true);
    $('.paymentmode').html(' ');
}

/**
 * Setting reservation No
 * @param {JSON} responce 
 */
function setReservationNo(responce) {
    $.each(responce.result[0], function(i, v) {
        let count = Number(v) + 1;
        setValue('reservation_no', "RES" + count)
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
    $('[name=customer_doc]').val(null);
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
        commonAjax('database.php', 'POST', data, '', 'Customer details updated.', '', { "functionName": "multipleSetValue", "param1": true })
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
                            <td class="text-center border-right-0 border-bottom-0">
                                <button type="button" data-toggle="tooltip" title="Delete" class="btn btn-icon btn-outline-danger btn-lg">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                            <td>
                            <select class="select2 room_category" id="room_${c}_category" name="room_category" required>
                                        <option  value="">Select a Room Type</option>
                                    </select>

                        </td>
                        <td>
                            <input type="datetime-local" name="hotel_from_date" autocomplete="off" required="required" data-item="from_date" class="from_date current_date form-control text-right">
                            <input type="datetime-local" tabindex="-1" name="hotel_to_date" autocomplete="off" required="required" data-item="to_date" class="to_date set_date form-control text-right">
                            <input type="hidden" name="hotel_no_of_night" data-getdate="current_date" data-setdate="set_date" autocomplete="off" data-item="no_of_night" class="no_of_night form-control text-right">
                        </td>
                        <td>
                            <input type="number" name="hotel_no_of_rooms" autocomplete="off" required="required" data-item="no_of_rooms" class="no_of_rooms form-control text-right">
                        </td>
                        <td>
                            <input type="number" name="hotel_no_of_adults" autocomplete="off" required="required" data-item="no_of_adults" class="no_of_adults form-control text-right">
                            <input type="number" name="hotel_no_of_childs" autocomplete="off" required="required" data-item="no_of_childs" class="no_of_childs form-control text-right">
                        </td>
                        <!--<td>
                            <input type="checkbox" name="no_extra_bed" required="required" value="0" data-item="charges_for_extra_bed" class="charges_for_extra_bed form-control text-right">
                        </td>-->
                        <td>
                            <input type="number" name="hotel_price" autocomplete="off" required="required" data-item="price" class="price form-control text-right">
                        </td>
                        <td>
                            <input type="number" name="hotel_discount" autocomplete="off" value="0" required="required" data-item="discount" class="discount form-control text-right">
                            <input type="text" name="discount_amount" tabindex="-1" name autocomplete="off" value="0" readonly data-item="discount-amount" class="discount-amount form-control text-right">
                        </td>
                        <td>
                            <input type="number" name="room_cgst" autocomplete="off" value="0" required="required" data-item="room_cgst" class="room_cgst form-control text-right">
                            <input type="number" name="room_sgst" tabindex="-1" name autocomplete="off" value="0" data-item="room_sgst" class="room_sgst  form-control text-right">
                        </td>
                        <td>
                            <div class="gst_details" data-gst="0"></div>
                            <input type="text" readonly name="room_total" class="total form-control text-right border-0">
                        </td>
                        </tr>`);
    listRoomType('room_' + c + '_category');
    setCurrentDate('current_date' + c)
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
 * Set to date
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
    $('.room_sgst').trigger('blur');
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
            let roomPrice = noofnights * (noofrooms * price);
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
})

/* Avaliable Room Count */

$(document).on('change', '.room_category', function() {
    let data = { "list_key": "room_availabilty_datewise", "hotel_from_date": $(this).closest('tr').find('.from_date').val(), "hotel_to_date": $(this).closest('tr').find('.to_date').val(), "room_category": $(this).closest('tr').find('.room_category').val() }
    commonAjax('services.php', 'POST', data, '', '', '', { 'functionName': 'showRoomAvableCount', "param1": $(this) });
});

function showRoomAvableCount(res, that) {
    that.closest('tr').find('.avaliable-count').remove();
    that.closest('tr').find('.no_of_rooms').after(`<div class="avaliable-count"> No of Rooms : ${res.result.total_no_rooms} <br> Max Occupied : ${res.result.max_occupaid} <br> Min Occupied : ${res.result.min_occupaid}</div>`);
    $('.room_sgst').trigger('blur');
}

/*
$(document).on('keyup blur', '.price', function() {
    let ele = $(this).closest('tr');
    let discountPercentage = emptySetToZero(ele.find('.discount').val());
    (discountPercentage) ? ele.find('.discount-amount').val(((ele.find('.price').val() / 100) * discountPercentage).toFixed(2)): ele.find('.discount-amount').val((ele.find('.price').val()).toFixed(2));
    ele.find('.total').val((ele.find('.price').val() - ele.find('.discount-amount').val()).toFixed(2));
    taxAmountCalculation();
});
*/

/*
$(document).on('click', '.charges_for_extra_bed', function() {
    let ele = $(this).closest('tr');
    let adultsCount = emptySetToZero(ele.find('.no_of_adults').val());
    let infantsCount = emptySetToZero(ele.find('.no_of_childs').val());
    let noofrooms = emptySetToZero(ele.find('.no_of_rooms').val());
    let noofnights = emptySetToZero(ele.find('.no_of_night').val());
    var extrabedflag = emptySetToZero(ele.find('.charges_for_extra_bed').is(":checked"));
    if (!noofnights)
        noofnights = 1;
    let json = ele.attr('data-json');
    if (json) {
        json = JSON.parse(json);
        let adult = emptySetToZero(json[0].room_capacity_adults);
        let infant = emptySetToZero(json[0].room_capacity_infant);
        let price = emptySetToZero(json[0].room_price);
        let extra = emptySetToZero(json[0].room_extra_bed_price);
        let extraadult = (noofrooms * adult) - adultsCount;
        let extrainfant = (noofrooms * infant) - infantsCount;
        let roomPrice = noofnights * (noofrooms * price);
        if (extraadult < 0 || extrainfant < 0) {
            let adultPrice = 0;
            if (extraadult < 0)
                adultPrice = Math.abs(extraadult) * extra;
            let infantPrice = 0;
            if (extrainfant < 0)
                infantPrice = Math.abs(extrainfant) * extra;

            (extrabedflag) ? ele.find('.price').val(roomPrice + adultPrice + infantPrice): ele.find('.price').val(roomPrice);
        } else {
            ele.find('.price').val(roomPrice);
        }
        let discountPercentage = emptySetToZero(ele.find('.discount').val());
        (discountPercentage) ? ele.find('.discount-amount').val(((ele.find('.price').val() / 100) * discountPercentage).toFixed(2)): ele.find('.discount-amount').val((ele.find('.price').val()).toFixed(2));
        ele.find('.total').val((ele.find('.price').val() - ele.find('.discount-amount').val()).toFixed(2));
        taxAmountCalculation();
    }
});
*/

$(document).on('keyup blur', '.room_cgst,.room_sgst', function() {
    taxAmountCalculation();
})

function taxAmountCalculation() {
    let totalAmountBeforeTax = 0;
    $(".price").each(function(i, v) {
        totalAmountBeforeTax = totalAmountBeforeTax + (Number($(this).val()) - Number($(this).closest('tr').find('.discount-amount').val()));
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
            commonAjax('database.php', 'POST', data, '', 'Customer updated successfully', '', { 'functionName': 'addReservation' });
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
        addReservation();
    }
}

function setValueToCustomerField(responce) {
    $.each(responce[0], function(i, v) {
        setValue(i, v);
        addReservation();
    })
}

function addReservation() {
    if (checkRequired('#reservation-add')) {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        var object = {};
        if ($("#button-add-item").attr('count') != '1') {
            object = $("#reservation-add").serializeObject();
        } else {
            object['meal_plan_id'] = $('[name="meal_plan_id"]').val();
            object['meal_price'] = $('[name="meal_price"]').val();
            object['meal_count'] = $('[name="meal_count"]').val();
            object['meal_total'] = $('[name="meal_total"]').val();
            $("tr.insertroom input").each(function() {
                object[$(this).attr('name')] = [$('[name=' + $(this).attr('name') + ']').val()];
            });
            $("tr:not(.insertroom) input").each(function() {
                object[$(this).attr('name')] = $('[name=' + $(this).attr('name') + ']').val();
            });
            object['room_category'] = $(".room_category").val();
            if (isEmptyValue(id)) {
                object['payment_mode'] = $("#payment_mode").val();
                object['advance'] = $(".advance").val();
                object['remarks'] = $(".remarks").val();
            }
            object['remarks'] = $(".remarks").val();
        }
        delete object['status'];
        object['type'] = $('[name="type"]').val();
        object['customer_id'] = $('[name="customer_id"]').val();
        object['reservation_no'] = $(".reservation_no").val();
        object['reservation_type'] = $(".reservation_type").val();
        object['travel_agency_id'] = $("#travel_agency_id").val();
        object['travel_agency_transaction_no'] = $("#travel_agency_transaction_no").val();
        object['list_key'] = 'reservation_room_insert';
        if (isEmptyValue(id)) {
            commonAjax('', 'POST', object, '', 'Reservation added successfully', '', { 'functionName': 'clearregistration' });
        } else {
            object['list_key'] = 'reservation_update';
            console.log(JSON.stringify(object));
            commonAjax('', 'POST', object, '', 'Reservation updated successfully', '', { 'functionName': 'clearregistration' });
        }
    }
}

/**
 * To clear registration form
 */
function clearregistration() {
    window.location = 'reservation-list.html';
    /*$("#reservation-add")[0].reset();
    $("#customer-add")[0].reset();
    $(".words").html(' ');
    $(".amountinwords").html(' ');
    let data = { "list_key": "list_general_tables", "table_name": "reservation_master", "column": "count(1)", "condition": { "status": "R" }, "like": "", "limit": "1" }
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setReservationNo" });*/
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