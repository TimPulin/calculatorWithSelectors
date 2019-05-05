function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function calculateRoad($tr) {
    var value = $tr.find('.read-level').val();

    var level = value === 'B' ? 1.5 : value;

    return level * randomInteger(1, 10);

}

function getOneElementValue($tr) {
    var type = $tr.find('.element-type').val();

    switch (type) {
        case 'road':
            return calculateRoad($tr);
            break;
        default:
            return 0;
    }
}

function calculateSum() {
    var result = 0;
    $('.element-value').each(function (i, item) {
        result += item.value * 1;
    });

    $('.result').val(result);
}

$('.element-type').change(function (e) {
    var $select = $(e.target);
    var elementType = e.target.value;

    $select.parents('tr').find('.element').hide();
    $select.parents('tr').find('.element-' + elementType).show();
});

$('.road-type').change(function (e) {
    var $select = $(e.target);
    var levelList = e.target.value.split(',');

    var options = '';
    for (var i = 0; i < levelList.length; i++) {
        var value = levelList[i];
        options += '<option>' + value + '</option>';
    }

    var $roadLevelSelect = $select.parents('tr').find('.read-level');

    $roadLevelSelect
        .html(options)
        .change();

    if (levelList.length === 1) {
        $roadLevelSelect.prop('disabled', true)
    } else {
        $roadLevelSelect.prop('disabled', false);
    }
});

$('.read-level').change(function(e) {
    var $select = $(e.target);
    var value = getOneElementValue($select.parents('tr'));

    $select
        .parents('tr')
        .find('.element-value')
        .val(value);

    calculateSum();
});