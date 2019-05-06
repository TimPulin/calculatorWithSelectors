function Road($myRow) {
    var $roadType = $myRow.find('.road-type');
    var $roadLevel = $myRow.find('.read-level');
    var $result = $myRow.find('.result');

    $roadType.change(function (event) {
        var levelList = event.target.value.split(',');

        var options = '';
        for (var i = 0; i < levelList.length; i++) {
            var value = levelList[i];
            options += '<option>' + value + '</option>';
        }

        var $roadLevelSelect = $myRow.find('.read-level');
        $roadLevelSelect
            .html(options)
            .change();

        if (levelList.length === 1) {
            $roadLevelSelect.prop('disabled', true)
        } else {
            $roadLevelSelect.prop('disabled', false);
        }

        $roadLevel.change();
    });

    $roadLevel.change(function(event) {
        var value = event.target.value;

        if (value === 'B') {
            value = 13;
        }

        $result.val(value * 3);
    });

    this.getValue = function () {
        return $result.val() || 0;
    };
}

function Spin($myRow) {
    this.getValue = function () {
        return 10;
    };
}

$(document).ready(function () {
    $('#app').appCalculator({
        resultInput: '.main-result',
        addButton: '.add',
        listContainer: '.list',
        typesSelect: '.types',
        calculateButton: '.calculate',
        types: [
            {
                label: 'Дорожка',
                Element: Road,
                templateId: 'road'
            },
            {
                label: 'Вращение',
                Element: Spin,
                templateId: 'spin'
            }
        ]
    });
});
