/**
 * Login 
 */

$(document).ready(function() {
    let data = {
        "list_key": "get_dashboard"
    }
    commonAjax('services.php', 'POST', data, '', '', '', {
        "functionName": "dashboard"
    })
});


function dashboard(responce) {
    if (responce.status_code == 200) {
        $(".expected-check-out").html(emptySetToZero(responce.result[0].ExpectedDepature));
        $(".expected-check-in").html(emptySetToZero(responce.result[0].ExpectedArrival));
        $(".today-check-in").html(emptySetToZero(responce.result[0].Checkin));
        $(".today-check-out").html(emptySetToZero(responce.result[0].checkout));

        let html = '';
        let availableCount = 0;
        let outofserviceCount = 0;
        let inhouseCount = 0;
        let outoforderCount = 0;
        let reservedCount = 0;
        let dirtyCount = 0;
        $.each(JSON.parse(responce.result[0].RoomStatus), function(i, v) {
            html += `<div class="col-md-2 floor-name">
                                ${i}
                            </div>
                            <div class="col-md-10">
                                <div class="form-row">`;


            $.each(v, function(inx, val) {
                let statusCode = val.current_status;
                let statusDesc = '';
                let status = '';
                switch (statusCode) {
                    case "A":
                        statusDesc = "available";
                        status = "Available";
                        availableCount += 1;
                        break;
                    case "IH":
                        statusDesc = "inhouse";
                        status = "In House";
                        inhouseCount += 1;
                        break;
                    case "OS":
                        statusDesc = "outofservice";
                        status = "Out Of Service";
                        outofserviceCount += 1;
                        break;
                    case "OD":
                        statusDesc = "outoforder";
                        status = "Out Of Order";
                        outoforderCount += 1;
                        break;
                    case "R":
                        statusDesc = "reserved";
                        status = "Reserved";
                        reservedCount += 1;
                        break;
                    case "D":
                        statusDesc = "dirty";
                        status = "Dirty";
                        dirtyCount += 1;
                        break;
                }

                html += `
                        <div class="room-list col-md-2 ${statusDesc}">
                            <p class="room-no m-0">${val.room_no}</p>
                            <p class="room-status">${status}</p>
                        </div>                
                    `;

            })

            html += `   </div>
                    </div>`;
        });

        $(".paint-layout").html(html);
        $(".room-status-count.available").html(availableCount);
        $(".room-status-count.outofservice").html(outofserviceCount);
        $(".room-status-count.inhouse").html(inhouseCount);
        $(".room-status-count.outoforder").html(outoforderCount);
        $(".room-status-count.reserved").html(reservedCount);
        $(".room-status-count.dirty").html(dirtyCount);
    }
}