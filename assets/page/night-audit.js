displayNightAuditInit();

var auditDate = '';

function displayNightAuditInit() {
    let data = { "list_key": "Nightaudit" }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "nightAuditDom" });
}

function nightAuditDom(responce) {
    let nightAuditHtml = '';
    var booking = responce.result.booking;
    auditDate = responce.result.audit_date;
    $('h4').html('Night Audit - ' + auditDate);
    var bookingED = 'data-toggle="collapse"';
    var bookingIcon = 'bg-danger-light';
    if (!booking.length) {
        bookingED = '';
        bookingIcon = 'bg-success-light opacity-08';
    }
    let bookingHtml = `<table class="table table-bordered">
                            <thead class="thead-light">
                                <tr>
                                    <th class="text-left border-right-0 border-bottom-0">Room Type</th>
                                    <th class="text-left border-right-0 border-bottom-0">No of Night</th>
                                    <th class="text-left border-right-0 border-bottom-0">From Date / To Date</th>
                                    <th class="text-center border-right-0 border-bottom-0">No of Guest (Adult / Child)</th>
                                    <th class="text-right border-right-0 border-bottom-0 ">Price</th>
                                    <th class="text-right border-right-0 border-bottom-0">Discount%</th>
                                    <th class="text-right border-bottom-0 item-total">Total</th>
                                    <th class="text-right border-bottom-0">Action</th>
                                </tr>
                            </thead>
                            <tbody class="room-details">`;
    booking.forEach(element => {
        bookingHtml += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_category} <br> - <br>  ${element.room_no} </td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_no_of_night}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_from_date} / ${element.hotel_to_date}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_no_of_adults} / ${element.hotel_no_of_childs}</td>
                            <td class="text-right border-right-0 border-bottom-0 ">${element.hotel_price}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_discount}%</td>
                            <td class="text-right border-bottom-0 item-total">${element.room_total}</td>
                            <td class="text-right border-bottom-0 item-total">
                                        <a href="booking-add.html?id=CHK1&amp;type=checkout" title="Checkout Booking" class="btn btn-icon btn-hover btn-sm btn-rounded ">
                                            <i class="anticon anticon-logout text-danger  font-size-20"></i>
                                        </a> 
                                        <button  title="+1 Day" data-booking-no="${element.booking_no}" data-room-no=${element.room_no} class="btn btn-icon btn-hover btn-sm btn-rounded plus-one-day">
                                            <i class="anticon anticon-plus-circle text-success font-size-20"></i>
                                        </button>  </td>
                        </tr>`;
    });
    bookingHtml += `</tbody></table>`;
    nightAuditHtml += `<div class="card m-b-10">
    <div class="card-header ${bookingIcon}" id="booking">
        <h5 class="p-10 m-0"><a href="#!" ${ bookingED } style="color: black;"  data-target="#bookingDetails" aria-expanded="true" aria-controls="booking">Booking</a><icon class="p-r-5">${(booking.length) ? booking.length : ''}</icon></h5>
    </div>
    <div id="bookingDetails" class="card-body collapse" aria-labelledby="booking" data-parent="#night-audit">  ${ bookingHtml }  </div>
    </div>`;

    var reservation = responce.result.reservation;
    var reservationED = 'data-toggle="collapse"';
    var reservationIcon = 'bg-danger-light';
    if (!reservation.length) {
        reservationED = '';
        reservationIcon = 'bg-success-light opacity-08 ';
    }
    let reservationHtml = `<table class="table table-bordered">
    <thead class="thead-light">
        <tr>
            <th class="text-left border-right-0 border-bottom-0">Room Type</th>
            <th class="text-left border-right-0 border-bottom-0">No of Night</th>
            <th class="text-left border-right-0 border-bottom-0">From Date/To Date</th>
            <th class="text-center border-right-0 border-bottom-0">Rooms Number</th>
            <th class="text-center border-right-0 border-bottom-0">No of Guest (Adult/Child)</th>
            <th class="text-right border-right-0 border-bottom-0 ">Price</th>
            <th class="text-right border-right-0 border-bottom-0">Discount%</th>
            <th class="text-right border-bottom-0 item-total">Total</th>
            <th class="text-right border-bottom-0">Action</th>
        </tr>
    </thead>
    <tbody class="room-details">`;
    reservation.forEach(element => {
        reservationHtml += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_category}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_no_of_night}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_from_date} / ${element.hotel_to_date}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_no} </td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_no_of_adults} / ${element.hotel_no_of_childs}</td>
                            <td class="text-right border-right-0 border-bottom-0 ">${element.hotel_price}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_discount}%</td>
                            <td class="text-right border-bottom-0 item-total">${element.room_total}</td>
                            <td class="text-right border-bottom-0 item-total"><a href="" title="No Show" class="btn btn-icon btn-hover btn-sm btn-rounded ">
                            <i class="anticon anticon-logout text-danger  font-size-20"></i>
                        </a> </td>
                        </tr>`;
    });
    reservationHtml += `</tbody></table>`;
    nightAuditHtml += `<div class="card m-b-10">
    <div class="card-header ${reservationIcon}" id="reservation">
        <h5 class="p-10 m-0"><a href="#!" ${ reservationED } style="color: black;"  data-target="#reservationDetails" aria-expanded="true" aria-controls="reservation">Reservation</a><icon class="p-r-5">${(reservation.length) ? reservation.length : ''}</icon></h5>
    </div>
    <div id="reservationDetails" class="card-body collapse" aria-labelledby="reservation" data-parent="#night-audit">  ${ reservationHtml }  </div>
    </div>`;

    var expenses = responce.result.expenses;
    var expensesED = 'data-toggle="collapse"';
    var expensesIcon = 'bg-danger-light';
    if (!expenses.length) {
        expensesED = '';
        expensesIcon = 'bg-success-light opacity-08 ';
    }
    nightAuditHtml += `<div class="card m-b-10">
    <div class="card-header ${expensesIcon}" id="expenses">
        <h5 class="p-10 m-0"><a href="#!" ${ expensesED } style="color: black;"  data-target="#expensesDetails" aria-expanded="true" aria-controls="expenses">Expences</a><icon class="p-r-5">${(expenses.length) ? expenses.length : ''}</icon></h5>
    </div>
    <div id="expensesDetails" class="card-body collapse" aria-labelledby="expenses" data-parent="#night-audit"></div>
    </div>`;

    var collection = responce.result.collection;
    var collectionED = 'data-toggle="collapse"';
    var collectionIcon = 'bg-success-light opacity-08 ';
    if (!collection.length) {
        collectionED = '';
        collectionIcon = 'bg-success-light opacity-08 ';
    }
    nightAuditHtml += `<div class="card m-b-10">
    <div class="card-header ${collectionIcon}" id="collection">
        <h5 class="p-10 m-0"><a href="#!" ${ collectionED } style="color: black;"  data-target="#collectionDetails" aria-expanded="true" aria-controls="collection">Collection</a><icon class="p-r-5">${(collection.length) ? collection.length : ''}</icon></h5>
    </div>
    <div id="collectionDetails" class="card-body collapse" aria-labelledby="collection" data-parent="#night-audit">`;

    nightAuditHtml += `<table class="table table-bordered">
    <thead class="thead-light">
        <tr>
            <th class="text-center border-right-0 border-bottom-0">Date</th>
            <th class="text-right border-right-0 border-bottom-0">Invoice No</th>
            <th class="text-center border-right-0 border-bottom-0">Booking No</th>
            <th class="text-center border-right-0 border-bottom-0">Payment Type</th>
            <th class="text-right border-right-0 border-bottom-0 ">Total Amount</th>
            <th class="text-right border-right-0 border-bottom-0">Recived Amount</th>
        </tr>
    </thead>
    <tbody class="room-details">`;
    collection.forEach(element => {
        nightAuditHtml += `<tr>
    <td class="text-center border-right-0 border-bottom-0">${element.created_at} </td>
    <td class="text-right border-right-0 border-bottom-0">${element.invoice_no}</td>
    <td class="text-center border-right-0 border-bottom-0">${element.process_no} </td>
    <td class="text-center border-right-0 border-bottom-0">${element.payment_type}</td>
    <td class="text-right border-right-0 border-bottom-0 ">${element.total_amount}</td>
    <td class="text-right border-right-0 border-bottom-0">${element.total_received}</td>
   
</tr>`;
    });
    nightAuditHtml += `</tbody></table></div> </div>`;

    var income = responce.result.income;
    var incomeED = 'data-toggle="collapse"';
    var incomeIcon = 'bg-success-light opacity-08 ';
    if (!income.length) {
        incomeED = '';
        incomeIcon = 'bg-success-light opacity-08 ';
    }
    nightAuditHtml += `<div class="card m-b-10">
    <div class="card-header ${incomeIcon}" id="income">
        <h5 class="p-10 m-0"><a href="#!" ${ incomeED } style="color: black;"  data-target="#incomeDetails" aria-expanded="true" aria-controls="income">Income</a><icon class="p-r-5">${(income.length) ? income.length : ''}</icon></h5>
    </div>
    <div id="incomeDetails" class="card-body collapse" aria-labelledby="income" data-parent="#night-audit">`;
    nightAuditHtml += `<table class="table table-bordered">
    <thead class="thead-light">
        <tr>
            <th class="text-center border-right-0 border-bottom-0">Date</th>
            <th class="text-right border-right-0 border-bottom-0">Invoice No</th>
            <th class="text-center border-right-0 border-bottom-0">Booking No</th>
            <th class="text-center border-right-0 border-bottom-0">Room No</th>
            <th class="text-right border-right-0 border-bottom-0 ">Income Type</th>
            <th class="text-right border-right-0 border-bottom-0">Total Amount</th>
        </tr>
    </thead>
    <tbody class="room-details">`;
    income.forEach(element => {
        nightAuditHtml += `<tr>
    <td class="text-center border-right-0 border-bottom-0">${element.income_date} </td>
    <td class="text-right border-right-0 border-bottom-0">${element.customer_ledger_id}</td>
    <td class="text-center border-right-0 border-bottom-0">${element.booking_no} </td>
    <td class="text-center border-right-0 border-bottom-0">${element.room_no}</td>
    <td class="text-right border-right-0 border-bottom-0 ">${element.income_type}</td>
    <td class="text-right border-right-0 border-bottom-0">${element.amount}</td>
   
</tr>`;
    });
    nightAuditHtml += `</tbody></table></div> </div>`;

    $("#night-audit").html(nightAuditHtml);
}

function nightAudit() {
    let data = { "list_key": "CloseNightaudit", "created_by": JSON.parse(userData)[0].employee_id, "audit_date": auditDate }
    commonAjax('', 'POST', data, 'afterNightAudit', '', '');
}

function afterNightAudit(responce) {
    if (responce.status_code == '200')
        locationReload();
    else {
        showToast(responce.message, 'error');
        setTimeout(() => {
            locationReload();
        }, 3000);
    }
}

$(document).on('click', '.plus-one-day', function() {
    var data = { "list_key": "UpdateBookingExtended", "booking_no": $(this).attr('data-booking-no'), "room_no": $(this).attr('data-room-no') };
    commonAjax('services.php', 'POST', data, '', '', '', {
        "functionName": "locationReload"
    });
});