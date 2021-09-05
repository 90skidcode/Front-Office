/*
 * Check Edit or Add
 */
let hTotal = 0;
let aTotal = 0;
let rTotal = 0;
let dTotal = 0;
let bTaxTotal = 0;
let fullTotal = 0;
checkEditorAddBooking('booking_master_new', 'booking_master_id');

function checkEditorAddBooking(databasename, conditionkey, imageFlag) {
    var url = new URL(window.location.href);
    var booking_no = url.searchParams.get("booking_no");
    var room_no = url.searchParams.get("room_no");
    if (!isEmptyValue(room_no)) {
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

    $('.meal-details').html(`
                            <tr>
                                <td>${master.meal_plan_full}</td>
                                <td>${numberWithCommas(master.meal_price)}</td>
                                <td>${master.meal_count}</td>
                                <td class="text-right">${numberWithCommas(master.meal_total)}</td>
                            </tr>
                        `);

    var html = "";
    rTotal = 0;
    dTotal = 0;
    bTaxTotal = 0;
    $.each(responce.result.Booking, function(index, value) {
        html += `
                    <tr class="thead-default">
                        <td class="text-left">${value.room_category}</td>                        
                        <td class="text-left">${value.hotel_from_date} / ${value.to_date}</td>
                        <td class="text-center">${value.no_of_nights}</td>
                        <td class="text-center">${value.hotel_no_of_adults} / ${value.hotel_no_of_childs}</td>
                        <td class="text-right">${numberWithCommas(value.hotel_price)}</td>
                        <td class="text-right">${value.hotel_discount} %</td>
                        <td class="text-right">${numberWithCommas(value.discount_amount)}</td>
                        <td class="text-right">${value.room_cgst}% / ${value.room_sgst}%</td>
                        <td class="text-right  font-weight-bolder">${numberWithCommas(value.total_amount)}</td>
                    </tr>
            `;

        rTotal += Number(value.total_amount);
        dTotal += Number(value.discount_amount) * Number(value.no_of_nights);
        bTaxTotal += Number(value.hotel_price) * Number(value.no_of_nights);
    })

    $(".room-details").html(html);


    $('.invoice-total').html(`
    <tbody>
        <tr>
            <th>Total Discount Amount :</th>
            <td>${numberWithCommas(dTotal)}</td>
        </tr>
        <tr>
            <th>Total Amount Before Tax :</th>
            <td>${numberWithCommas(bTaxTotal - dTotal)}</td>
        </tr>            
        <tr>
            <th>Total Tax :</th>
            <td>${numberWithCommas(rTotal -(bTaxTotal - dTotal) )}</td>
        </tr>
        <tr>
            <th>Total :</th>
            <td class="font-weight-bolder">${numberWithCommas(rTotal)}</td>
        </tr>  
    </tbody> `);
    var hotelDetails = '';
    hTotal = 0;
    if (responce.result.Hotel) {
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
    } else
        $(".hotel-details-html").hide();

    var advanceDetails = '';
    aTotal = 0;
    if (responce.result.Advance) {
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
    } else
        $(".advance-details-html").hide();


    fullTotal = (Number(rTotal) + Number(hTotal) + Number(master.meal_total))
    $(".total-details ").html(`<tbody>
            <tr class="text-info">
                <td class="text-right">
                    <h5 class="text-primary m-r-10 font-size-18">Total :</h5>
                </td>
                <td class="text-right font-size-14 font-weight-bold w-25">
                    <h5 class="text-primary  font-size-16 font-weight-bold">${numberWithCommas(fullTotal)}</h5>
                </td>
            </tr>
            </tbody>
    `);

    $('.invoive-info').html(`<div class="col-md-4 col-xs-12 invoice-client-info">
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
                                <h6 class="text-uppercase text-primary font-size-20">Total Due :
                                    <span>${numberWithCommas(Number(fullTotal)-Number(aTotal))}</span>
                                </h6>
                            </div>`);
}