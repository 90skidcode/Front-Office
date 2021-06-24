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
    $('h4.float-left').html(response.result[0].customer_fname + "Ledger Details");
}