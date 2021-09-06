$(document).on('click', '#button-add-item', function() {
    let c = $(this).attr('count');
    $(this).attr('count', parseInt($(this).attr('count')) + 1)
    $('#addItem').before(`<tr>
                            <td class="text-center border-right-0 border-bottom-0">
                                <button type="button" data-toggle="tooltip" title="Delete" class="btn btn-icon btn-outline-danger btn-lg">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                            <td>
                                <select class="select2 room_category" id="room_${c}_category" name="room_category" required>
                                    <option  value="0">Select a Room Type</option>
                                </select>

                                <input type="hidden" name="hotel_room_category" autocomplete="off" data-item="room_category" class=" form-control text-right">
                            </td>
                            <td>
                                <input type="number" name="hotel_no_of_night" autocomplete="off" required="required" data-item="no_of_night" class="no_of_night form-control text-right">
                            </td>
                            <td>
                                <input type="datetime-local" name="hotel_from_date" autocomplete="off" required="required" data-item="from_date" class="from_date form-control text-right">
                                <input type="datetime-local" name="hotel_to_date" autocomplete="off" required="required" data-item="to_date" class="to_date form-control text-right">
                            </td>
                            <td>
                                <input type="number" name="hotel_no_of_rooms" autocomplete="off" required="required" data-item="no_of_rooms" class="no_of_rooms form-control text-right">
                            </td>
                            <td>
                                <input type="number" name="hotel_no_of_adults" autocomplete="off" required="required" data-item="no_of_adults" class="no_of_adults form-control text-right  float-left">
                                <input type="number" name="hotel_no_of_childs" autocomplete="off" required="required" data-item="no_of_childs" class="no_of_childs form-control text-right  float-left">
                            </td>
                            <td>
                                <input type="checkbox"  name="hotel_charges_for_extra_bed" required="required" data-item="charges_for_extra_bed" class="charges_for_extra_bed form-control text-right">

                            </td>
                            <td>
                                <input type="number" name="hotel_price" autocomplete="off" required="required" data-item="price" class="price form-control text-right">
                            </td>
                            <td>
                                <input type="number" name="hotel_discount" autocomplete="off" value="0" required="required" data-item="discount" class="discount form-control text-right">
                                <input type="text" autocomplete="off" value="0" readonly data-item="discount-amount" class="discount-amount form-control text-right">
                            </td>
                            <td>
                                <input type="text" readonly class="total form-control text-right border-0">
                            </td>
                        </tr>`);

    $('#room_' + c + '_category').select2();
})


$(document).on('click', '.btn-outline-danger', function() {
    if ($("#button-add-item").attr('count') != '1') {
        $(this).closest('tr').remove();
        $("#button-add-item").attr('count', parseInt($("#button-add-item").attr('count')) - 1);
    }
})