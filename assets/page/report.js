var setMonth = new Date().getMonth() + 1;
var setYear = new Date().getFullYear();
displayCustomerListInit(setMonth, setYear);

function displayCustomerListInit(setMonth, setYear) {
    setMonth = setMonth;
    setYear = setYear;
    let data = { "list_key": "calander_check", "month": setMonth, "year": setYear };
    commonAjax('', 'POST', data, '', '', '', { "functionName": "report" });
}

function report(res) {
    avalilabilityChart(setMonth, setYear, res.result)
}

/**
 * Avalilability Chart
 * @param m - Month
 * @param y - Year 
 */

function avalilabilityChart(month, year, data) {
    var m = month;
    var y = year;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //var rooms = [{ 'Single': '4', 'Double': '4', 'Presidential suite': '4', 'Royal suite': '4' }]
    var rooms = [];
    let countI = 0;
    $.each(data, function(i, v) {
        if (!countI) {
            $.each(v.Reservation, function(inx, val) {
                rooms.push(inx);
            })
        }
        countI = 1;
    });

    var getNoOfDaysInMonths = /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var table = `<thead class="sticky">
                    <tr >
                        <th><b class="font-size-16">${months[parseInt(month-1)]} <br> ${y}</b> </th>`;
    $.each(rooms, function(i, v) {
        table += `<th class="text-center">${v} <br> (Booking / Reservation / No Of Rooms)</th>`;
    });

    table += `      </tr>
                </thead>
            <tbody>`;

    if (Number(month) < 10)
        month = "0" + month;
    for (var i = 1; i <= getNoOfDaysInMonths; i++) {
        if (Number(i) < 10)
            i = "0" + i;

        var date = `${y}-${month}-${i}`;
        var dayInWords = days[new Date(date).getDay()];
        var classToDays = "";
        (dayInWords == 'Sunday' || dayInWords == 'Saturday') ? classToDays = "bg-success-light": classToDays = "bg-transparent";
        table += `<tr > 
                    <th class="p-5"><b class="font-size-16"> ${i} </b> <small class="font-weight-normal m-0">${dayInWords}</small></th>`;
        $.each(rooms, function(index, v) {
            table += `<th class="${classToDays} p-5 font-size-12 font-weight-bold text-center"  data-date="${date}" data-category="${v.replace(" ","").toLowerCase()}" data-total="${v}"><span title="Booking"> ${data[date]['Booking'][v].occupaid_booking}</span> / <span title="Reservation" > ${data[date]['Reservation'][v].occupaid} </span> / <span title="No Of Rooms" >  ${data[date]['room_count'][v].total_room}</span></th>`;
        });
        table += `</tr>`;
    }

    table += `</tbody>`;

    $('.avalilability-table').html(table);

    /*$.each(data, function(i, v) {
        $.each(v.databooked[0], function(index, value) {
            var currentNode = $('[data-date="' + v.date + '"][data-category="' + index.replace(" ", "").toLowerCase() + '"]')
            currentNode.html(`${value}/${parseInt($(currentNode).attr('data-total'))-parseInt(value)}`);
        })
    })*/
}

/**
 * Previous Month
 */
$(document).on('click', '.prev-my', function() {
    setMonth = setMonth - 1;
    if (setMonth > 12) {
        setMonth = 1;
        setYear = setYear + 1;
    }
    if (!setMonth) {
        setMonth = 12;
        setYear = setYear - 1;
    }
    displayCustomerListInit(setMonth, setYear);

})

/**
 * Next Month
 */
$(document).on('click', '.next-my', function() {
    setMonth = setMonth + 1;
    if (setMonth > 12) {
        setMonth = 1;
        setYear = setYear + 1;
    }
    if (!setMonth) {
        setMonth = 12;
        setYear = setYear - 1;
    }
    displayCustomerListInit(setMonth, setYear);
})