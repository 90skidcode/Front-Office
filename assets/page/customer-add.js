$(document).ready(function() {

    listCountry();
    listState($('#country').val());
    $('#country').select2().on('change', function() {
        listState($(this).val());
    })
    $('#state').select2().on('change', function() {
        listCity($(this).val());
    });

    checkAddOrEdit('customer_master', 'customer_id', true);
    /**
     * Add Customer
     */

    $('.customer-add').click(function() {
        if (checkRequired('#customer-add')) {
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
            if (isEmptyValue(id)) {
                // Add New
                var data = {
                    "query": 'add',
                    "databasename": 'customer_master',
                    "values": $("#customer-add").serializeObject()
                }
                commonAjax('', 'POST', data, '#customer-add', 'Customer added successfully');
            } else {
                // Edit
                var data = {
                    "query": 'update',
                    "databasename": 'customer_master',
                    "values": $("#customer-add").serializeObject(),
                    "condition": {
                        "customer_id": id
                    }
                }
                commonAjax('database.php', 'POST', data, '', 'Customer updated successfully');
            }
        }
    });
})


/**
 * File Upload
 */
var uploadData = $('[name=customer_doc]').val().split(",");
$(document).ready(function() {
    uploadData = $('[name=customer_doc]').val().split(",");
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
            url: 'https://glowmedia.in/frontoffice/admin/api/upload.php',
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
                $('[name=customer_doc]').val(uploadData.toString());
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
    uploadData = $('[name=customer_doc]').val().split(",");
    if (value) {
        uploadData = removeItemOnce(uploadData, value);
        uploadData = uploadData.filter(function(e) { return e });
        $('[name=customer_doc]').val(uploadData.toString());
    }
    $(this).closest('div').remove();
    showToast("File removed successfully", 'success');
})