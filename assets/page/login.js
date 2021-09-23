$(document).ready(function() {
    localStorage.clear();
    $(document).on("click", ".sign-in", function() {
        loader(true);
        let data = { "list_key": "master_login", "user_name": $('#userName').val(), "user_password": $('#password').val() }
        commonAjax('services.php', 'POST', data, '', '', "Please Check your Username and Password", {
            "functionName": "login"
        })
    })

});

function login(responce) {
    if (responce.status_code == 200) {
        localStorage.setItem("user", JSON.stringify(responce.result));
        location.href = "dashboard.html";
    } else {
        loader(true);
        showToast('Please check User name and Password!!', 'error');
    }

}

/* Add Loader to body */
$('body').prepend(`<div class="loader-area">
    <div class="loader-overlay">
        <div class="loader"></div>
    </div>
</div>`);

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




localStorage.clear();
localStorage.clear();


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
 * Loader 
 * @param {boolean} type 
 * 
 */

function loader(type) {
    (type) ? $(".loader-area").addClass('display-block'): $(".loader-area").removeClass('display-block');
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