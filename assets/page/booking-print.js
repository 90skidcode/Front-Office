/*
 * Check Edit or Add
 */

checkEditorAddBooking('booking_master_new', 'booking_master_id');


function checkEditorAddBooking(databasename, conditionkey, imageFlag) {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("invoice_id");
    var type = url.searchParams.get("type");
    if (!isEmptyValue(id)) {
        let data = { "list_key": "booking_detail", "invoice_no": id };
        let flag = false;
        if (imageFlag && typeof(imageFlag) != 'undefined') {
            flag = true;
        }
        if (type == 'hotel')
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setBookingHotel" });
        else
            commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setBookingMiss" });
    }
}

/**
 * Set Booking Value
 * @param {JSON} responce 
 */

function setBookingHotel(responce) {
    $('.miss').addClass('d-none');
    $('.hotel').removeClass('d-none');
    let master = responce.result.master[0];
    let details = responce.result.details[0];
    $('.invoive-info').html(`  <div class="col-md-4 col-xs-12 invoice-client-info">
                <h6>Billed To</h6>
                <h6 class="m-0">${master.customer_title} ${master.customer_fname} ${master.customer_lname}</h6>
                <p class="m-0 m-t-10">${master.customer_address} -  ${master.customer_pincode}</p>
                <p class="m-0">${master.customer_phone}</p>
            </div>
            <div class="col-md-4 col-sm-6">
                <h6>Order Information</h6>
                <p class="m-0">Date : ${(new Date()).toDateString().replace('GMT+0530 (India Standard Time)' , '')}</p>
                <p class="m-0">Booking No : ${details.booking_no}</p>
            </div>
                <div class="col-md-4 col-sm-6">
                <h6 class="m-b-20">Invoice Number : <span><b>${details.invoice_no}</b></span></h6>
               
            </div>`);

    /* 
     <h6 class="text-uppercase text-primary">Total Due :
                    <span>Rs.${Number(master.total_amount)-Number(master.advance)}</span>
                </h6>
    $('.meal-details').html(`
                             <tr>
                                 <td>${master.meal_plan_id}</td>
                                 <td>${master.meal_price}</td>
                                 <td>${master.meal_count}</td>
                                 <td>${master.meal_total}</td>
                             </tr>
                         `);*/



    var html = "";
    var total = 0;
    var totalDiscount = 0;
    var price = 0;

    $.each(responce.result.details, function(index, value) {
        html += `
                    <tr class="thead-default">
                        <td class="text-left">${value.room_category}</td>                        
                        <td class="text-left">${value.hotel_from_date} / ${value.hotel_to_date}</td>
                        <td class="text-center">${value.hotel_no_of_night}</td>
                        <td class="text-center">${value.hotel_no_of_adults} / ${value.hotel_no_of_childs}</td>
                        <td class="text-right">${numberWithCommas(value.hotel_price)}</td>
                        <td class="text-right">${value.hotel_discount} %</td>
                        <td class="text-right">${numberWithCommas(value.discount_amount)}</td>
                        <td class="text-right">${value.room_cgst}% / ${value.room_sgst}%</td>
                        <td class="text-right  font-weight-bolder">${numberWithCommas(value.room_total)}</td>
                    </tr>
            `;
        total += Number(value.room_total);
        totalDiscount += Number(value.discount_amount);
        price += Number(value.hotel_price);
    });

    $('.invoice-total').html(`
            <tbody>
            <tr>
                <th>Total Discount Amount :</th>
                <td>Rs.${totalDiscount}</td>
            </tr>
            <tr>
                <th>Total Amount Before Tax :</th>
                <td>Rs.${price - totalDiscount }</td>
            </tr>
           
            <tr>
                <th>Total Tax :</th>
                <td>Rs.${total - (price - totalDiscount)}</td>
            </tr>           
           
            <tr class="text-info">
                <td>
                    <hr>
                    <h5 class="text-primary m-r-10">Total :</h5>
                </td>
                <td>
                    <hr>
                    <h5 class="text-primary">${numberWithCommas(total)}</h5>
                </td>
            </tr>
            </tbody>
    `);

    $(".room-details").html(html);
}


function setBookingMiss(response) {
    $('.miss').removeClass('d-none');
    $('.hotel').addClass('d-none');
    let master = response.result.master[0];
    let details = response.result.details[0];
    $('.invoive-info').html(`  <div class="col-md-4 col-xs-12 invoice-client-info">
                <h6>Billed To</h6>
                <h6 class="m-0">${master.customer_title} ${master.customer_fname} ${master.customer_lname}</h6>
                <p class="m-0 m-t-10">${master.customer_address} -  ${master.customer_pincode}</p>
                <p class="m-0">${master.customer_phone}</p>
            </div>
            <div class="col-md-4 col-sm-6">
                <h6>Order Information</h6>
                <p class="m-0">Date : ${(new Date()).toDateString().replace('GMT+0530 (India Standard Time)' , '')}</p>
                <p class="m-0">Booking No : ${details.booking_no}</p>
            </div>
                <div class="col-md-4 col-sm-6">
                <h6 class="m-b-20">Invoice Number : <span><b>${details.invoice_no}</b></span></h6>
               
            </div>`);
    $('.meal-details').html(`
        <tr>
            <td>${master.meal_plan_full}</td>
            <td class="text-right">${numberWithCommas(master.meal_price)}</td>
            <td class="text-right">${master.meal_count}</td>
            <td class="text-right">${numberWithCommas(master.meal_total)}</td>
        </tr>
    `);

    var hotelDetails = '';
    var hTotal = 0;
    if (response.result.Hotel) {
        response.result.Hotel.forEach(element => {
            if (element && element.status == 1) {
                var hotelDate = new Date(element.created_at).toString().split("GMT");
                hotelDetails += `<tr>
                                <td class="text-left font-size-12">${hotelDate[0]}</td>
                                <td class="text-left font-size-12">${element.bill_no}</td>
                                <td class="text-right font-size-12">${numberWithCommas(element.amount)}</td>
                            </tr>`;
                hTotal += Number(element.amount);
            }
        });

        $(".hotel-details").html(hotelDetails);
    } else
        $(".hotel-details-html").hide();

    var miscellaneousDetails = '';
    var miTotal = 0;

    if (response.result.Miscellaneous) {
        response.result.Miscellaneous.forEach(element => {
            var miscellaneousDate = new Date(element.created_at).toString().split("GMT");
            miscellaneousDetails += `<tr>
                                <td class="text-left border-right-0 border-bottom-0">${miscellaneousDate[0]}</td>
                                <td class="text-left border-right-0 border-bottom-0">${element.miscellaneous_expenses}</td>                           
                                <td class="text-right border-right-0 border-bottom-0">${numberWithCommas(element.miscellaneous_total)}</td>
                                
                            </tr>`;
            miTotal += Number(element.miscellaneous_total);
        });

        $(".miscellaneous-details").html(miscellaneousDetails);
    } else
        $(".hotel-details-html").hide();


    $('.invoice-total').html(`
        <tbody>
      
        <tr class="text-info">
            <td>
                <hr>
                <h5 class="text-primary m-r-10">Total :</h5>
            </td>
            <td>
                <hr>
                <h5 class="text-primary">${numberWithCommas(Number(master.meal_total) + hTotal + miTotal)}</h5>
            </td>
        </tr>
        </tbody>
`);
}