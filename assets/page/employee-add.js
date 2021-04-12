$(document).ready(function() {

    listemployeeType();
    checkEmployeeAddOrEdit('employee_master', 'employee_id', true);

    /**
     * Add employee
     */

    $('.employee-add').click(function() {
        if (checkRequired('#employee-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = $("#employee-add").serializeObject();
                data['list_key'] = 'employee_insert';
                console.log(data);
                commonAjax('services.php', 'POST', data, '', 'Employee added successfully', '', 'goToListing');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'employee_master',
                    "values": $("#employee-add").serializeObject(),
                    "condition": {
                        "employee_id": id
                    },
                }
                commonAjax('database.php', 'POST', data, '', 'Employee  updated successfully', '', 'goToListing');
            }
        }
    });


    /**
     * Add employee Type
     */

    $(document).on('click', '.save-employee-type', function() {
        if (checkRequired('.employee_type_modal')) {
            let data = {
                "query": 'add',
                "databasename": 'employee_type',
                "values": $(".employee_type_modal").serializeObject()
            }
            commonAjax('database.php', 'POST', data, '.employee_type_modal', 'Employee type added successfully');
            listemployeeType();
            $("#employee_type_modal").modal('hide');
        }
    });
})

/**
 * List employee Type in select 2
 */

function listemployeeType() {
    let data = {
        "query": 'fetch',
        "databasename": 'employee_type',
        "column": {
            "employee_type": "employee_type"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "listSelect2", "param1": "#employee_type", "param2": "employee_type" })
}


/*
 * Check Edit or Add
 */

function checkEmployeeAddOrEdit(databasename, conditionkey, imageFlag) {
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
    } else {
        let data = { "list_key": "list_general_tables", "table_name": "employee_master", "column": "count(1)", "like": "", "limit": "1" }
        commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "setEmployeeinNo" });
    }
}

function setEmployeeinNo(res) {
    $.each(res.result[0], function(i, v) {
        let count = Number(v) + 1;
        setValue('employee_id', "1000" + count);
    })
}


/**
 * Got To Listing
 */

function goToListing() {
    window.location.href = 'employee-list.html';
}


/**
 * File Upload
 */
var uploadData = $('[name=employee_docs]').val().split(",");
$(document).ready(function() {
    uploadData = $('[name=employee_docs]').val().split(",");
    $('input[type="file"]').change(function() {
        $(".customer-add").prop('disabled', true);
        var formData = new FormData();
        formData.append('file', $('#upload')[0].files[0]);
        let randomClass = randomString(16, 'aA');
        let html = ` <div class="col-md-3 ${randomClass}" data-val="">
                        <span class="badge-danger float-right border-radius-round position-absolute pointer remove-img" title="remove">
                            <span class="icon-holder d-none">
                                <i class="anticon anticon-close"></i>
                            </span>
                        </span>
                        <img class="w-100" src="" alt="">
                        <div class="progress">
                            <div class="progress-bar progress-bar-animated bg-success" role="progressbar" style="width: 0%"></div>
                        </div>
                    </div>`;
        $(".image-prev-area").append(html);
        $(".image-prev-area").removeClass('d-none');
        readURL(this, randomClass);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $("." + randomClass + " .progress-bar").css({
                            width: percentComplete + "%"
                        })
                        if (percentComplete === 100) {

                        }
                    }
                }, false);
                return xhr;
            },
            url: 'http://glowmedia.in/frontoffice/admin/api/upload.php',
            type: 'POST',
            data: formData,
            success: function(data) {
                $(".customer-add").prop('disabled', false);
                let dataResult = JSON.parse(data);
                $("#upload").val(null);
                $("." + randomClass + " .icon-holder").removeClass('d-none');
                if (dataResult.status_code == 200) {
                    showToast(dataResult.message, 'success');
                    uploadData.push(dataResult.result);
                    $("." + randomClass).attr('data-val', dataResult.result);
                } else {
                    showToast(dataResult.message, 'error');
                }
                uploadData = uploadData.filter(function(e) { return e });
                $('[name=employee_docs]').val(uploadData.toString());
            },
            error: function(data) {
                $(".customer-add").prop('disabled', false);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
});

$(document).on('click', '.image-prev-area .remove-img', function() {
    var value = $(this).closest('div').attr('data-val');
    uploadData = $('[name=employee_docs]').val().split(",");
    if (value) {
        uploadData = removeItemOnce(uploadData, value);
        uploadData = uploadData.filter(function(e) { return e });
        $('[name=employee_docs]').val(uploadData.toString());
    }
    $(this).closest('div').remove();
    showToast("File removed successfully", 'success');
})