/*
 * Check Edit or Add
 */

checkEditorAddBooking('booking_master_new', 'booking_master_id');

function checkEditorAddBooking(databasename, conditionkey, imageFlag) {
    var url = new URL(window.location.href);
    var booking_no = url.searchParams.get("booking_no");
    var room_no = url.searchParams.get("room_no");
    if (!isEmptyValue(booking_no)) {
        if (typeof(room_no) != 'undefined' && room_no) {
            var data = { "list_key": "booking_detail_ledger", "booking_no": booking_no, "room_no": room_no };
        } else {
            var data = { "list_key": "booking_detail_ledger", "booking_no": booking_no };
        };
        // commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayCustomerList", "param1": "table-customer-ledger" });
        commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setBookingValue" });
    }
}

/**
 * Set Booking Value
 * @param {JSON} responce 
 */

function setBookingValue(responce) {
    let master = responce.result.master[0];
    var url = new URL(window.location.href);
    var booking_no = url.searchParams.get("booking_no");
    $('.invoive-info').html(`  <div class="col-md-4 col-xs-12 invoice-client-info">
                <h6>Billed To</h6>
                <h6 class="m-0">${master.customer_title} ${master.customer_fname} ${master.customer_lname}</h6>
                <p class="m-0 m-t-10">${master.customer_address} -  ${master.customer_pincode}</p>
                <p class="m-0">${master.customer_phone}</p>
            </div>
            <div class="col-md-4 col-sm-6">
                <h6>Order Information</h6>
                <p class="m-0">Date : ${(new Date()).toDateString().replace('GMT+0530 (India Standard Time)' , '')}</p>
                <p class="m-0">Booking No : ${booking_no}</p>
            </div>
                <div class="col-md-4 col-sm-6">
                <h6 class="m-b-20">Invoice Number : <span><b>Sample Bill</b></span></h6>
                <h6 class="text-uppercase text-primary">Total Due :
                    <span>${numberWithCommas(Number(master.total_amount)-Number(master.advance))}</span>
                </h6>
            </div>`);

    $('.meal-details').html(`
                            <tr>
                                <td>${master.meal_plan_full}</td>
                                <td>${numberWithCommas(master.meal_price)}</td>
                                <td>${master.meal_count}</td>
                                <td class="text-right">${numberWithCommas(master.meal_total)}</td>
                            </tr>
                        `);

    $('.invoice-total').html(`
            <tbody>
            <tr>
                <th>Total Discount Amount :</th>
                <td>${numberWithCommas(master.total_discount)}</td>
            </tr>
            <tr>
                <th>Total Amount Before Tax :</th>
                <td>${numberWithCommas(master.total_beforetax)}</td>
            </tr>
           
            <tr>
                <th>Total Tax :</th>
                <td>${numberWithCommas(master.total_taxamount)}</td>
            </tr>           
            <tr>
                <th>Total Advance :</th>
                <td>${numberWithCommas(master.advance)}</td>
            </tr>
            <tr class="text-info">
                <td>
                    <hr>
                    <h5 class="text-primary m-r-10">Total :</h5>
                </td>
                <td>
                    <hr>
                    <h5 class="text-primary">${numberWithCommas(master.total_amount)}</h5>
                </td>
            </tr>
            </tbody>
    `);

    var html = "";
    $.each(responce.result.details, function(index, value) {
        html += `
                    <tr class="thead-default">
                        <td class="text-left">${value.room_category}</td>                        
                        <td class="text-left">${value.hotel_from_date} / ${value.hotel_to_date}</td>
                        <td class="text-center">${value.hotel_no_of_night}</td>
                        <td class="text-center">${value.hotel_no_of_night}</td>
                        <td class="text-center">${value.hotel_no_of_adults} / ${value.hotel_no_of_childs}</td>
                        <td class="text-right">${numberWithCommas(value.hotel_price)}</td>
                        <td class="text-right">${value.hotel_discount} %</td>
                        <td class="text-right">${numberWithCommas(value.discount_amount)}</td>
                        <td class="text-right">${value.room_cgst}% / ${value.room_sgst}%</td>
                        <td class="text-right  font-weight-bolder">${numberWithCommas(value.room_total)}</td>
                    </tr>
            `;
    })

    $(".room-details").html(html);


    var hotelDetails = '';
    let hTotal = 0;
    responce.result.Hotel.forEach(element => {
        if (element) {
            var hotelDate = new Date(element.created_at).toString().split("GMT");
            hotelDetails += `<tr>
                                <td class="text-left font-size-12">${hotelDate[0]}</td>
                                <td class="text-left font-size-12">${element.bill_no}</td>
                                <td class="text-right font-size-12">${numberWithCommas(element.amount)}</td>
                            </tr>`;
            hTotal += Number(element.amount);
        }
    });
    hotelDetails += `<tr class="bg">
                        <td class="text-right font-size-14 font-weight-bold" colspan='2'>Hotel Total: </td>
                        <td class="text-right font-size-14 font-weight-bold" >${numberWithCommas(hTotal)}</td>
                    </tr>`;
    $(".hotel-details").html(hotelDetails);


    var advanceDetails = '';
    let aTotal = 0;

    responce.result.Advance.forEach(element => {
        if (element) {
            var advanceDate = new Date(element.created_at).toString().split("GMT");
            advanceDetails += `<tr>
                                <td class="text-left font-size-12">${advanceDate[0]}</td>
                                <td class="text-left font-size-12">${element.advance_no}</td>
                                <td class="text-right font-size-12">${numberWithCommas(element.advance_amount)}</td>
                            </tr>`;
            aTotal += Number(element.advance_amount);
        }
    });

    advanceDetails += `<tr class="bg">
                            <td class="text-right font-size-14 font-weight-bold" colspan='2'>Advance Total: </td>
                            <td class="text-right font-size-14 font-weight-bold" >${numberWithCommas(aTotal)}</td>
                        </tr>`;
    $(".advance-details").html(advanceDetails);
}