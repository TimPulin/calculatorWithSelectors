function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
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
    var randomValue = randomInteger(1, 10);
    var level = e.target.value === 'B' ? 1.5 : e.target.value;

    $select
        .parents('tr')
        .find('.element-value')
        .val(level * randomValue);

    calculateSum();
});
