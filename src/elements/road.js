function Road($myRow) {
    var $roadType = $myRow.find('.road-type');
    var $roadLevel = $myRow.find('.read-level');
    var $result = $myRow.find('.result');

    $roadLevel.hide();

    $roadType.change(function (event) {
        var roadType = event.target.value;

        $roadLevel
            .hide()
            .filter('.' + roadType)
            .show()
            .change()
    });

    $roadLevel.change(function(event) {
        var value = event.target.value;

        $result.val(value);
    });

    this.getValue = function () {
        return $result.val() || 0;
    };
}
