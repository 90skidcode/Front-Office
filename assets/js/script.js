/* Menu */

let userData = localStorage.getItem("user");

if (!userData && location.pathname != '/' && location.pathname != '/index.html')
    window.location.href = 'index.html';
else {
    /**
     * Add Status & creted by for all form
     */

    $('form').append(`<input type="hidden" class="form-control" name="status" value="1">
                      <input type="hidden" class="form-control" name="created_by" value="${JSON.parse(userData)[0].employee_type_id}">`);


    let menuHtml = ``;
    switch (JSON.parse(userData)[0].employee_type_id) {
        case '1':
            menuHtml = `<li class="nav-item dropdown">
                    <a href="dashboard.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-dashboard"></i>
                        </span>
                        <span class="title">Dashboard</span>           
                    </a>        
                </li>
                <li class="nav-item dropdown">
                    <a class="dropdown-toggle" data-href="booking-add.html" data-href="booking-list.html" data-href="booking-amend-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-plus"></i>
                        </span>
                        <span class="title">Check In</span> 
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>           
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="booking-list.html">Check IN List</a>
                        </li>
                        <li>
                            <a href="booking-amend-list.html">Amend Check IN List</a>
                        </li>
                        <li>
                            <a href="booking-add.html">Add Check IN</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a data-href="reservation-add.html" data-href="reservation-list.html" data-href="reservation-amend-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-schedule"></i>
                        </span>
                        <span class="title">Reservation</span> 
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>         
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="reservation-list.html">Reservation List</a>
                        </li>
                        <li>
                            <a href="reservation-amend-list.html">Amend Reservation List</a>
                        </li>
                        <li>
                            <a href="reservation-add.html">Add Reservation</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a href="customer-ledger.html" data-href="customer-ledger.html" data-href="customer-ledger-details.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-audit"></i>
                        </span>
                        <span class="title">Customer Ledger</span>           
                    </a>        
                </li>
                <li class="nav-item dropdown">
                <a href="night-audit.html" data-href="night-audit.html">
                    <span class="icon-holder">
                        <i class="anticon anticon-file-protect"></i>
                    </span>
                    <span class="title">Night Audit</span>
                </a>
            </li>
                <li class="nav-item dropdown">
                    <a href="customer-list.html" data-href="customer-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-usergroup-add"></i>
                        </span>
                        <span class="title">Customer</span>           
                    </a>        
                </li>
                <li class="nav-item dropdown">
                    <a href="expenses-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-dollar"></i>
                        </span>
                        <span class="title">Expenses</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="room-list.html" data-href="room-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-key"></i>
                        </span>
                        <span class="title">Room</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="room-category-list.html" data-href="room-category-add.html">
                        <span class="icon-holder">
                            <i class="fas fa-door-open"></i>
                        </span>
                        <span class="title">Room Category</span>
                    </a>
                </li>
                
                <li class="nav-item dropdown">
                    <a href="agent-list.html" data-href="agent-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-solution"></i>
                        </span>
                        <span class="title">Agent</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="mealplan-list.html" data-href="mealplan-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-coffee"></i>
                        </span>
                        <span class="title">Meal Plan</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="paymentmode-list.html" data-href="paymentmode-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-dollar"></i>
                        </span>
                        <span class="title">Payment Mode</span>
                    </a>
                </li>

                <li class="nav-item dropdown">
                    <a href="employee-list.html" data-href="employee-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-user"></i>
                        </span>
                        <span class="title">Employee</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="dropdown-toggle">
                        <span class="icon-holder">
                            <i class="anticon anticon-file-sync"></i>
                        </span>
                        <span class="title">Report</span>
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="report-avalilability-chart.html">Avalilability Chart</a>
                        </li>
                    </ul>
                </li>`;
            break;
        case '2':

            menuHtml = `<li class="nav-item dropdown">
                    <a href="dashboard.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-dashboard"></i>
                        </span>
                        <span class="title">Dashboard</span>           
                    </a>        
                </li>
                <li class="nav-item dropdown">
                    <a class="dropdown-toggle" data-href="booking-add.html" data-href="booking-list.html" data-href="booking-amend-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-plus"></i>
                        </span>
                        <span class="title">Check In</span> 
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>           
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="booking-list.html">Check IN List</a>
                        </li>
                        <li>
                            <a href="booking-amend-list.html">Amend Check IN List</a>
                        </li>
                        <li>
                            <a href="booking-add.html">Add Check IN</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a data-href="reservation-add.html" data-href="reservation-list.html" data-href="reservation-amend-list.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-schedule"></i>
                        </span>
                        <span class="title">Reservation</span> 
                        <span class="arrow">
                            <i class="arrow-icon"></i>
                        </span>         
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="reservation-list.html">Reservation List</a>
                        </li>
                        <li>
                            <a href="reservation-amend-list.html">Amend Reservation List</a>
                        </li>
                        <li>
                            <a href="reservation-add.html">Add Reservation</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a href="customer-list.html" data-href="customer-add.html">
                        <span class="icon-holder">
                            <i class="anticon anticon-usergroup-add"></i>
                        </span>
                        <span class="title">Customer</span>           
                    </a>        
                </li>`;
            break;
    }

    menuHtml += `
            <li class="nav-item dropdown">
                <a href="index.html">
                    <span class="icon-holder">
                        <i class="anticon anticon-logout text-danger"></i>
                    </span>
                    <span class="title">LogOut</span>           
                </a>        
            </li>
            `;


    $(".side-nav-menu").html(menuHtml);
}

/* Add Loader to body */
$('body').prepend(`<div class="loader-area">
    <div class="loader-overlay">
        <div class="loader"></div>
    </div>
</div>`);

/* Set Menu Active */

var path = window.location.pathname;
var page = path.split("/").pop();
$(".nav-item [href='" + page + "']").closest('li').addClass('active');
$(".nav-item [data-href='" + page + "']").closest('li').addClass('active');
$(".nav-item [href='" + page + "']").closest('ul').closest('li').addClass('open');
$(".nav-item [data-href='" + page + "']").closest('ul').closest('li').addClass('open');

/**
 * Title
 */

$('title').html('Chill Breeze');

/**
 * Input Auto Complete Off
 */

$('input').attr('autocomplete', 'no-fill');

/**
 * Select 2
 */

$(document).ready(function() {
    if ($('.select2').length) {
        $('.select2').select2();
        $('select').on('select2:open', function(e) {
            $('.add-new-record').remove()
            if (typeof($(this).attr('data-hasModel')) != 'undefined' && $(this).attr('data-hasModel')) {
                $(".select2-results__options").after('<div class="add-new-record" data-toggle="modal" data-target="#' + $(this).attr('data-hasModel') + '"><i class="anticon anticon-plus"></i> Add New Record</div>')
            }
        });
        $(document).on('shown.bs.modal', function(e) {
            try {
                if ($('body').find('.select2-container--open').length) {
                    $('.select2').select2("close");
                    var targetId = e.target.id.replace("_modal", "");
                    $('[name="' + targetId + '"]').focus();
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
});

/**
 * To Serlize object
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


/**
 * 
 * @param {JSON} data  Full data for Table list
 * @param {JSON} column  Column Header
 * @param {boolean} filter  Individual Column filter
 * @param {'string'} dataTableId Table ID
 */

/**
 * Table
 */
function dataTableDisplay(data, column, filter, dataTableId) {
    $('#' + dataTableId).DataTable({
        dom: 'Bfrtlip',
        "pagingType": "full_numbers",
        colReorder: true,
        fixedHeader: true,
        paging: true,
        keys: true,
        'columns': column,
        'data': data,
        initComplete: function() {
            if (filter) {
                var i = 0;
                this.api().columns().every(function() {
                    var column = this;
                    if ($("thead tr:first-child th").eq(i).text() != 'Action') {
                        var select = $('<select><option value=""></option></select>')
                            .appendTo($("thead tr:first-child th").eq(i).empty())
                            .on('change', function() {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
                                column
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                            });
                        column.data().unique().sort().each(function(d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        });
                        i++;
                    } else {
                        $("thead tr:first-child th").eq(i).html("")
                    }
                });
            }
        }
    });
}

/**
 * To Serlize object
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    var $radio = $('input[type=radio],input[type=checkbox]', this);
    $.each($radio, function() {
        if (!o.hasOwnProperty(this.name)) {
            o[this.name] = '';
        }
    });
    return o;
};

/**
 *  To Get Parameter
 *  @parameterName 
 */

function getParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

/**
 * Append Delete Modal
 */

$("body").append(`
<div class="modal fade" id="delete">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="delete">Delete</h5>
            <button type="button" class="close" data-dismiss="modal">
                <i class="anticon anticon-close"></i>
            </button>
        </div>
        <div class="modal-body">
            Are you sure want to Delete?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger btn-delete">Delete</button>
        </div>
    </div>
</div>
</div>
`)



/**
 * Set vale to delete modal
 */

$(document).on('click', '.btn-delete-table', function() {
    $(".btn-delete").attr('data-detete', $(this).attr('data-delete'))

    if (typeof($(this).attr('data-type')) != 'undefined')
        $(".btn-delete").attr('data-type', $(this).attr('data-type'))
})


/**
 * ShoW Toast
 * @param {string} msg Message
 * @param {string} type it shoul be success/error
 */

function showToast(msg, type) {
    let background = "";
    let icon = '';
    (type == 'error') ? background = 'badge-danger': background = 'badge-success';
    (type == 'success') ? icon = 'anticon-check-circle': icon = 'anticon-info-circle'
    var toastHTML = `<div class="toast fade hide" data-delay="5000">
        <div class="toast-header ${background}">
            <i class="anticon ${icon} m-r-5 text-white"></i>
            <strong class="mr-auto">${type.toUpperCase()}</strong>
            <button type="button" class="ml-2 close text-white" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            ${msg}
        </div>
    </div>`

    $('#notification-toast').append(toastHTML)
    $('#notification-toast .toast').toast('show');
    setTimeout(function() {
        $('#notification-toast .toast:first-child').remove();
    }, 5000);
}


/* Input for number no negative numbers */

$("input[type=number]").each(function(index) {
    $(this).attr({
        "min": "0",
        "oninput": "validity.valid||(value='')"
    });
});


/**
 * Loader 
 * @param {boolean} type 
 * 
 */

function loader(type) {
    (type) ? $(".loader-area").addClass('display-block'): $(".loader-area").removeClass('display-block');
}

/* For Validate Required field */

$(document).on('keyup blur', '[required]', function() {
    ($(this).val()) ? $(this).removeClass('is-invalid'): $(this).addClass('is-invalid');
})


/**
 * Required field checker
 * @param {string} selector  ID/Class for the Form
 */

function checkRequired(selector) {
    var flag = true;
    $(selector + " [required]").each(function(index) {
        if (!$(this).val()) {
            $(this).addClass('is-invalid');
            flag = false;
        } else
            $(this).removeClass('is-invalid');
    });
    return flag;
}

/**
 * Common ajax functions
 * @param {string} url 
 * @param {string} type 
 * @param {JSON} data 
 * @param {string} resetFormSelector  ID/Class for the Form to reset after success
 * @param {string} sMessage 
 * @param {string} eMessage 
 * @param {JSON} sCallBack  *function* for function name, *param* for call back paramater
 * @param {JSON} eCallBack  *function* for function name, *param* for call back paramater
 */

function commonAjax(url, type, data, resetFormSelector, sMessage, eMessage, sCallBack, eCallBack) {
    loader(true);
    let serverUrl = 'https://glowmedia.in/frontoffice/admin/api/';
    $.ajax({
        url: (isEmptyValue(url)) ? serverUrl + 'services.php' : serverUrl + url,
        type: type,
        data: data,
        success: function(response) {
            loader(false);
            try {
                var response = JSON.parse(response);
                if (data.query == 'fetch') {
                    if (!isEmptyValue(response)) {
                        if (!isEmptyValue(resetFormSelector)) {
                            $(".select2[multiple]").val(null).trigger("change");
                            $(resetFormSelector)[0].reset();
                        }
                        if (!isEmptyValue(sMessage))
                            showToast(sMessage, 'success')
                        if (!isEmptyValue(sCallBack))
                            window[sCallBack.functionName](response, sCallBack.param1, sCallBack.param2, sCallBack.param3)
                    } else {
                        if (!isEmptyValue(eMessage))
                            showToast(eMessage, 'error')
                        if (!isEmptyValue(eCallBack))
                            window[eCallBack.functionName](response, eCallBack.param1, eCallBack.param2, eCallBack.param3)
                    }
                } else {
                    if (response.status_code == '200') {
                        if (!isEmptyValue(resetFormSelector)) {
                            $(".select2[multiple]").val(null).trigger("change");
                            $(resetFormSelector)[0].reset();
                        }
                        if (!isEmptyValue(sMessage))
                            showToast(sMessage, 'success')
                        if (!isEmptyValue(sCallBack))
                            window[sCallBack.functionName](response, sCallBack.param1, sCallBack.param2, sCallBack.param3)
                    } else {
                        (isEmptyValue(eMessage)) ? showToast(response.message, 'error'): showToast(eMessage, 'error')
                        if (!isEmptyValue(eCallBack))
                            window[eCallBack.functionName](response, eCallBack.param1, eCallBack.param2, eCallBack.param3)
                    }
                }
            } catch (err) {
                console.log(err)
            }

        }
    });
}
/**
 * To check a value is empty or not 
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
 */

function isEmptyValue(value) {
    return (
        // null or undefined
        (value == null) ||

        // has length and it's zero
        (value.hasOwnProperty('length') && value.length === 0) ||

        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
    )
}

/**
 * To List in Select2
 * @param {JSON} data 
 * @param {string} selector ID/Class name of the node
 * @param {String} Label for Select 2
 * @param {String} Value for Select 2
 */

function listSelect2(data, selector, jsonLabel, jsonValue) {
    let select2Data = [];
    let i = 1;
    data.forEach(element => {
        if (jsonValue)
            i = eval('element.' + jsonValue);
        select2Data.push({ 'id': i, 'text': eval('element.' + jsonLabel) })
        if (!jsonValue || typeof(jsonjsonValueKey) == 'undefined')
            i++;
    });
    $(selector).select2({
        data: select2Data
    })
}


/**
 * Location Reload
 */

function locationReload() {
    setTimeout(function() {
        location.reload();
    }, 1100)
}

/**
 * Setting Value to field
 * @param {string} Field name attr
 * @param {string} Field Value
 */

function setValue(name, value) {
    $('[name="' + name + '"]').val(value);
    if ($('[name="' + name + '"]').hasClass('select2'))
        $('[name="' + name + '"]').trigger('change');
}

/**
 * List Country
 */

function listCountry() {
    $("#country").select2({
        data: country.countries
    })
}

/**
 * List State
 * @param {string} countryId
 */

function listState(countryId) {
    var tempState = state.states.filter(function(el) {
        return el.country_id == countryId;
    });
    $("#state").select2('destroy').empty().select2({
        data: tempState
    })
    listCity($('#state').val());
}

/**
 *  List City
 * @param {string} stateId
 */

function listCity(stateId) {
    var tempCity = city.cities.filter(function(el) {
        return el.state_id == stateId;
    });
    $("#city").select2('destroy').empty().select2({
        data: tempCity
    })
}


/**
 * To set current date time
 * @param {string} ele Class name
 */

function setCurrentDate(ele) {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    $("." + ele).val(now.toISOString().slice(0, 16));
}

/**
 * To add days
 * @param {date} theDate from Date
 * @param {number} days  No of days to increment
 * @param {string} ele Class name
 */
function addDays(theDate, days, ele) {
    var now = new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    $("." + ele).val(now.toISOString().slice(0, 16));
}



/**
 * To set row json 
 * @param {JSON} responce 
 * @param {*} that 
 */

function setJsonToRow(responce, that) {
    that.closest('tr').attr('data-json', JSON.stringify(responce));
    (!that.hasClass('no-trigger')) ? that.closest('tr').find('.price').val(responce[0].room_price): that.removeClass('no-trigger');
    $('.room_sgst').trigger('blur');
}

/**
 * To remove row json 
 * @param {JSON} responce 
 * @param {*} that 
 */

function removeJsonToRow(responce, that) {
    that.closest('tr').attr('data-json', '');
    $('.no_of_night').blur();
}


/**
 * Empty set to zero
 */

function emptySetToZero(value) {
    if (typeof(value) != 'undefined' && value && typeof(value) != 'NaN')
        return Number(value);
    else
        return 0;
}

/**
 * Number to Words
 * @param {number} eg:258452
 */

var single = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var double = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (single[Number(n[1])] || double[n[1][0]] + ' ' + single[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (single[Number(n[2])] || double[n[2][0]] + ' ' + single[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (single[Number(n[3])] || double[n[3][0]] + ' ' + single[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (single[Number(n[4])] || double[n[4][0]] + ' ' + single[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (single[Number(n[5])] || double[n[5][0]] + ' ' + single[n[5][1]]) + 'only ' : '';
    return str;
}

/*
 * Check Edit or Add
 */

function checkAddOrEdit(databasename, conditionkey, imageFlag) {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    if (!isEmptyValue(id)) {
        let data = {
            "query": 'fetch',
            "databasename": databasename,
            "column": {
                "* ": " *"
            },
            "condition": {},
            "like": ""
        }

        data['condition'][conditionkey] = id;
        let flag = false;
        if (imageFlag && typeof(imageFlag) != 'undefined') {
            flag = true;
        }
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "multipleSetValue", "param1": flag })
    }
}

/**
 * Multiple set value
 * @param { JSON } 
 */

function multipleSetValue(responce, imageFlag) {
    if (!isEmptyValue(responce)) {
        $.each(responce[0], function(i, v) {
            setValue(i, v)
        })
    }
    docShow(imageFlag)
}

/**
 * Based on the flag
 * @param {Booleen} imageFlag 
 */
function docShow(imageFlag) {
    if (imageFlag) {
        var uploadData = $('[name=customer_doc]').val().split(",");
        /**
         * To preload Image in edit  
         */
        let html = '';
        if (uploadData.toString() != "" && uploadData) {
            $.each(uploadData, function(i, v) {
                let randomClass = randomString(16, 'aA');
                html += ` <div class="col-md-3 ${randomClass}" data-val="${v}">
                            <span class="badge-danger float-right border-radius-round position-absolute pointer remove-img" title="remove">
                                <span class="icon-holder">
                                    <i class="anticon anticon-close"></i>
                                </span>
                            </span>
                            <img class="w-100" src=".in/frontoffice/admin/api/uploads/${v}" alt="">                        
                        </div>`;
            })
            $(".image-prev-area").append(html);
            $(".image-prev-area").removeClass('d-none');
        }
    }
}

/**
 * Local Imgae file to Base64 Image
 * @param {*} input Eg: this
 * @param {*} randomClass  where the image want to set Classname
 */

function readURL(input, randomClass) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("." + randomClass + " img").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

/**
 * Ramdom String 
 * @param {*} length Eg : 16
 * @param {*} chars Eg: 'aA' , '#aA' , '#A!'
 */

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

/**
 * Remove Item From Array
 * @param {*} array Eg:[a,b,'c',d] 
 * @param {*} value Eg: b
 */

function removeItemOnce(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}


/**
 *  Wheel Scroll Stop in JS
 */

$('input').on("wheel mousewheel ", function(e) {
    if (e.originalEvent.deltaY > 0) {
        e.preventDefault();
        return;
    } else if (e.originalEvent.wheelDeltaY < 0) {
        e.preventDefault();
        return;
    }
});

/**
 * 
 * @param {Numbers} value eg : 1234567
 * @returns Rs.12,34,567.00
 */
function numberWithCommas(value) {
    let x = 0;
    (typeof(value) != 'undefined') ? x = value: x = 0;
    return "Rs." + (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

/**
 * Room Status
 * @param { String } statusCode eg: A
 * @returns room status
 */
function roomStatus(statusCode) {
    switch (statusCode) {
        case "A":
            return { "status": "Available", "html": "<span class='status available'>Available</span>" };
            break;
        case "IH":
            return { "status": "In House", "html": "<span class='status inhouse'>In House</span>" };
            break;
        case "I":
            return { "status": "In House", "html": "<span class='status inhouse'>In House</span>" };
            break;
        case "OFS":
            return { "status": "Out Of Service", "html": "<span class='status outofservice'>Out Of Service</span>" };
            break;
        case "OFO":
            return { "status": "Out Of Order", "html": "<span class='status outoforder'>Out Of Order</span>" };
            break;
        case "R":
            return { "status": "Reserved", "html": "<span class='status reserved'>Reserved</span>" };
            break;
        case "D":
            return { "status": "Dirty", "html": "<span class='status dirty'>Dirty</span>" };
            break;
        case "O":
            return { "status": "Checkout", "html": "<span class='status dirty'>Checkout</span>" };
            break;
        case "S":
            return { "status": "Swap", "html": "<span class='status dirty'>Room Swap</span>" };
            break;
        default:
            return '';
    }
}

/**
 * Date Calculation using from date and to date
 */
function dateClaculation(fromDate, todate) {
    var fromDate = new Date(fromDate);
    var todate = new Date(todate);
    var diffTime = Math.abs(todate - fromDate);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return emptySetToZero(diffDays);
}

/**
 * Set Min date to Datetime-local
 * @param {*} date 
 * @param {*} ele eg $('.acd')
 */

function disableDateinDatePicker(date, ele) {
    var today = new Date(date).toISOString();
    var minDate = today.substring(0, today.length - 1);
    ele.attr('min', minDate);
}