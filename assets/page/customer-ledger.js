displayCustomerListInit()


function displayCustomerListInit() {
    let data = { "list_key": "get_ledger_list" }
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "displayCustomerList", "param1": "table-customer-ledger" });
}

function displayCustomerList(response, dataTableId) {
    var tableHeader = [{
        "data": "customer_fname",
        mRender: function(data, type, row) {
            return row.customer_fname.toUpperCase();
        }
    }, {
        "data": "customer_phone"
    }, {
        "data": "room_no",
        mRender: function(data, type, row) {
            let room = row.room_no.split(',');
            if (room.length == 1) {
                return `<td class="text-right">               
                <a class="btn btn-primary  btn-sm btn-rounded " href="customer-ledger-details.html?booking_no=${row.booking_no}">
                    ${row.room_no}
                </a>
            </td>`;
            } else if (room.length > 1) {
                let html = `<td class="text-right">               
                <a class="btn btn-hover btn-sm btn-rounded" href="customer-ledger-details.html?booking_no=${row.booking_no}">
                    All
                </a>`
                $.each(room, function name(i, v) {
                    html += `<a class="btn btn-hover btn-sm btn-rounded" href="customer-ledger-details.html?booking_no=${row.booking_no}&room_no=${v}">
                    ${v}
                </a>`
                });
                html += `</td>`;
                return html;
            }

        }
    }];
    dataTableDisplay(response.result, tableHeader, false, dataTableId);
}