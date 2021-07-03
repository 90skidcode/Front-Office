displayNightAuditInit()


function displayNightAuditInit() {
    let data = { "list_key": "Nightaudit", "audit_date": "2021-06-24" }
    commonAjax('', 'POST', data, '', '', '', { "functionName": "nightAuditDom" })
}

function nightAuditDom(responce) {

    let nightAuditHtml = '';


    var booking = responce.result.booking;
    var bookingED = 'data-toggle="collapse"';
    var bookingIcon = '';
    if (!booking.length) {
        bookingED = '';
        bookingIcon = '<i class="anticon anticon-check-circle  font-size-20" style="color: green;"></i>';
    }
    let bookingHtml = '';
    nightAuditHtml += `<div class="card m-b-10">
    <div class="card-header" id="booking">
        <h5 class="p-10 m-0"><a href="#!" ${ bookingED } style="color: black;"  data-target="#bookingDetails" aria-expanded="true" aria-controls="booking">Booking</a><icon>${ bookingIcon }</icon></h5>
    </div>
    <div id="bookingDetails" class="card-body collapse" aria-labelledby="booking" data-parent="#night-audit">  aS  </div>
    </div>`;


    var expenses = responce.result.expenses;
    var expensesED = 'data-toggle="collapse"';
    var expensesIcon = '';
    if (!expenses.length) {
        expensesED = '';
        expensesIcon = '<i class="anticon anticon-check-circle font-size-20  style="color: green;"></i>';
    }
    nightAuditHtml += `<div class="card m-b-10">
    <div class="card-header" id="expenses">
        <h5 class="p-10 m-0"><a href="#!" ${ expensesED } style="color: black;"  data-target="#expensesDetails" aria-expanded="true" aria-controls="expenses">Expences</a><icon>${expensesIcon}</icon></h5>
    </div>
    <div id="expensesDetails" class="card-body collapse" aria-labelledby="expenses" data-parent="#night-audit">  aS  </div>
    </div>`;


    $("#night-audit").html(nightAuditHtml);
}