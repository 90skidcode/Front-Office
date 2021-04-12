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
    }
}

/**
 * Set Reservation Value
 * @param {JSON} responce 
 */

function setReservationValue(responce) {
    let master = responce.result.master[0];
    $('.invoive-info').html(`  <div class="col-md-4 col-xs-12 invoice-client-info">
                <h6>Billed To</h6>
                <h6 class="m-0">${master.customer_title} ${master.customer_fname} ${master.customer_lname}</h6>
                <p class="m-0 m-t-10">${master.customer_address} -  ${master.customer_pincode}</p>
                <p class="m-0">${master.customer_phone}</p>
            </div>
            <div class="col-md-4 col-sm-6">
                <h6>Order Information</h6>
                <p class="m-0">Date : ${(new Date()).toDateString().replace('GMT+0530 (India Standard Time)' , '')}</p>
                <p class="m-0">Reservation Id : ${master.reservation_no}</p>
            </div>
                <div class="col-md-4 col-sm-6">
                <h6 class="m-b-20">Invoice Number <span>#123685479624</span></h6>
                <h6 class="text-uppercase text-primary">Total Due :
                    <span>Rs.${Number(master.total_amount)-Number(master.advance)}</span>
                </h6>
            </div>`);

    $('.meal-details').html(`
                            <tr>
                                <td>${master.meal_plan_id}</td>
                                <td>${master.meal_price}</td>
                                <td>${master.meal_count}</td>
                                <td>${master.meal_total}</td>
                            </tr>
                        `);

    $('.invoice-total').html(`
            <tbody>
            <tr>
                <th>Total Discount Amount :</th>
                <td>Rs.${master.total_discount}</td>
            </tr>
            <tr>
                <th>Total Amount Before Tax :</th>
                <td>Rs.${master.total_beforetax}</td>
            </tr>
            <tr>
                <th>CGST (${master.tax_cgst_percentage}%) :</th>
                <td>Rs.${master.cgst}</td>
            </tr>
            <tr>
                <th>SGST (${master.tax_sgst_percentage}%) :</th>
                <td>Rs.${master.sgst}</td>
            </tr>
            <tr>
                <th>Total Tax (${Number(master.tax_cgst_percentage) + Number(master.tax_sgst_percentage)}%):</th>
                <td>Rs.${master.total_taxamount}</td>
            </tr>           
            <tr>
                <th>Total Advance :</th>
                <td>Rs.${master.advance}</td>
            </tr>
            <tr class="text-info">
                <td>
                    <hr>
                    <h5 class="text-primary m-r-10">Total :</h5>
                </td>
                <td>
                    <hr>
                    <h5 class="text-primary">Rs.${master.total_amount}</h5>
                </td>
            </tr>
            </tbody>
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