

function Spin($myRow) {
    var SpinClass = fCalculator.Spin;

    var $result = $myRow.find('.result');
    var $f = $myRow.find('[name="f"]');
    var $type = $myRow.find('select[name="type"]');
    var $level = $myRow.find('select[name="level"]');
    var $error = $myRow.find('[name="error"]');

    var spin = fCalculator.create().spin();

    spin
        .getAvailableTypes()
        .forEach(function(type) {
            $type.append('<option>' + type + '</option>');
        });

    spin
        .getAvailableLevels()
        .forEach(function(level) {
            $level.append('<option>' + level + '</option>');
        });

    $f.change(updateValue);
    $type.change(updateValue);
    $level.change(updateValue);
    $error.change(updateValue);

    updateValue();

    function updateValue() {
        spin
            .setType($type.val())
            .setLevel($level.val())
            .setF($f[0].checked ? SpinClass.F : '');

        if (spin.hasError()) {
            $error.parents('.form-check').show();
            spin.setError($error[0].checked ? SpinClass.V : '');
        } else {
            $error.parents('.form-check').hide();
            spin.setError('')
        }

        $result.val(spin.getValue());
    }

    this.getValue = function () {
        return $result.val() || 0;
    };
}
