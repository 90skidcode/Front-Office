displayCustomerListInit()


function displayCustomerListInit() {
    var url = new URL(window.location.href);
    var booking_no = url.searchParams.get("booking_no");
    var room_no = url.searchParams.get("room_no");
    if (typeof(room_no) != 'undefined' && room_no) {
        var data = { "list_key": "get_ledger", "condition": { "customer_ledger.booking_no": booking_no, "customer_ledger.room_no": room_no } };
    } else {
        var data = { "list_key": "get_ledger", "condition": { "customer_ledger.booking_no": booking_no } };
    }
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayCustomerList", "param1": "table-customer-ledger" });
}

function displayCustomerList(response) {
    var bookingArray = response.result.Booking[0];
    var bookingDate = new Date(bookingArray.created_at).toString().split("GMT");
    $('h4.float-left').html(bookingArray.customer_fname.toUpperCase() + " Ledger Details");
    let customerDom = ` <ul>
                            <li>
                                <p><b>Customer Name</b></p>
                                <p>${bookingArray.customer_fname}</p>
                            </li>
                            <li>
                                <p><b>Booking No</b></p>
                                <p>${bookingArray.booking_no}</p>
                            </li>                            
                            <li>
                                <p><b>Booking Date</b></p>
                                <p>${bookingDate[0]}</p>
                            </li>
                            <li>
                                <p><b>Room No</b></p>
                                <p>${bookingArray.room_no}</p>
                            </li>
                            
                        </ul>`;
    $(".customer-info").html(customerDom);

}