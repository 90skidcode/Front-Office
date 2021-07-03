displayNightAuditInit()


function displayNightAuditInit() {
    let data = { "list_key": "Nightaudit", "audit_date": "2021-06-24" }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "nightAuditDom" })
}

function nightAuditDom(responce) {

    let nightAuditHtml = '';


    var booking = responce.result.booking;
    var bookingED = 'data-toggle="collapse"';
    var bookingIcon = 'bg-danger-light';
    if (!booking.length) {
        bookingED = '';
        bookingIcon = 'bg-success-light opacity-08 ';
    }
    let bookingHtml = `<table class="table table-bordered">
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
    booking.forEach(element => {
        bookingHtml += `<tr>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_category}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_no_of_night}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_from_date} / ${element.hotel_to_date}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.room_no}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_no_of_adults} / ${element.hotel_no_of_childs}</td>
                            <td class="text-right border-right-0 border-bottom-0 ">${element.hotel_price}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_discount}%</td>
                            <td class="text-right border-bottom-0 item-total">${element.room_total}</td>
                            <td class="text-right border-bottom-0 item-total"><a href="booking-add.html?id=CHK1&amp;type=checkout" title="Checkout Booking" class="btn btn-icon btn-hover btn-sm btn-rounded ">
                            <i class="anticon anticon-logout text-danger  font-size-20"></i>
                        </a> <a href="booking-add.html?id=CHK1&amp;type=checkout" title="+1 Day" class="btn btn-icon btn-hover btn-sm btn-rounded ">
                        <i class="anticon anticon-plus-circle text-success  font-size-20"></i>
                    </a>  </td>
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
                            <td class="text-center border-right-0 border-bottom-0">${element.room_no}</td>
                            <td class="text-center border-right-0 border-bottom-0">${element.hotel_no_of_adults} / ${element.hotel_no_of_childs}</td>
                            <td class="text-right border-right-0 border-bottom-0 ">${element.hotel_price}</td>
                            <td class="text-right border-right-0 border-bottom-0">${element.hotel_discount}%</td>
                            <td class="text-right border-bottom-0 item-total">${element.room_total}</td>
                            <td class="text-right border-bottom-0 item-total"><a href="reservation-add.html?id=CHK1&amp;type=checkout" title="Checkout Booking" class="btn btn-icon btn-hover btn-sm btn-rounded ">
                            <i class="anticon anticon-logout text-danger  font-size-20"></i>
                        </a> <a href="reservation-add.html?id=CHK1&amp;type=checkout" title="+1 Day" class="btn btn-icon btn-hover btn-sm btn-rounded ">
                        <i class="anticon anticon-plus-circle text-success font-size-20"></i>
                    </a>  </td>
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




    $("#night-audit").html(nightAuditHtml);
}