/*
 * Check Edit or Add
 */

checkEditorAddPrint('booking_master_new', 'booking_master_id');

function checkEditorAddPrint(databasename, conditionkey, imageFlag) {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    if (!isEmptyValue(id)) {
        let data = { "list_key": "print_advance_detail", "advance_no": id };
        let flag = false;
        if (imageFlag && typeof(imageFlag) != 'undefined') {
            flag = true;
        }
        commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setPrintValue" })
    }
}

/**
 * Set Print Value
 * @param {JSON} responce 
 */

function setPrintValue(responce) {
    let master = responce.result[0];
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    $('.invoive-info').html(`<div class="col-md-4 col-xs-12 invoice-client-info">
                <h6>Billed To</h6>
                <h6 class="m-0">${master.customer_title} ${master.customer_fname} ${master.customer_lname}</h6>
                <p class="m-0 m-t-10">${master.customer_address} -  ${master.customer_pincode}</p>
                <p class="m-0"> Phone No : ${master.customer_phone}</p>
            </div>
            <div class="col-md-4 col-sm-6">
                <h6>Order Information</h6>
                <p class="m-0">Date : ${(new Date()).toDateString().replace('GMT+0530 (India Standard Time)' , '')}</p>
            </div>
                <div class="col-md-4 col-sm-6">
                <h6 class="m-b-20">Invoice Number <span>#${master.advance_no}</span></h6>               
            </div>`);

    $('.meal-details').html(`
                            <tr>
                                <td>${master.payment_mode}</td>
                                <td>Rs. ${master.advance_amount}</td>
                            </tr>
                        `);


    var html = "";
    $.each(responce.result.details, function(index, value) {

        html += `
                    <tr class="thead-default">
                        <td class="text-left">${value.room_category}</td>
                        <td class="text-left">${value.hotel_no_of_night}</td>
                        <td class="text-left">${value.hotel_from_date} / ${value.hotel_to_date}</td>
                        <td class="text-center">${value.hotel_no_of_night}</td>
                        <td class="text-center">${value.hotel_no_of_adults} / ${value.hotel_no_of_childs}</td>
                        <td class="text-right">RS.${value.hotel_price}</td>
                        <td class="text-right">${value.hotel_discount} %</td>
                        <td class="text-right">RS.${value.discount_amount}</td>
                        <td class="text-right  font-weight-bolder">RS.${value.room_total}</td>
                    </tr>
            `;

    })

    $(".room-details").html(html);
}