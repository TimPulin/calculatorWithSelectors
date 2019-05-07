function Spin($myRow) {
    var $result = $myRow.find('.result');

    $myRow.find('select').change(function() {
        var somethink = $myRow.find('.some-think').val() * 1;
        var positions = $myRow.find('.positions').val() * 1;

        $result.val(somethink + positions);
    });

    this.getValue = function () {
        return $result.val() || 0;
    };
}
