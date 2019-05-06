

$.fn.appCalculator = function (params) {
    var $el = $(this);

    // Create select for types
    var options = params.types.map(function (item, index) {
        return '<option value="' + index + '">' + item.label +'</option>';
    });
    $el.find(params.typesSelect).html(options);

    var elements = [];
    function addElement() {
        var selectValue = $el.find(params.typesSelect).val();

        var el = params.types[selectValue];

        var $myRow = utils.renderTemplate(el.templateId);
        var elementBlock = new el.Element($myRow);

        var elementContainer = utils.renderTemplate('elementRow');
        elementContainer.append($myRow);

        $el.find(params.listContainer).append(elementContainer);

        elements.push(elementBlock);
    }
    function calculateResult() {
        var result = 0;

        for (var i = 0; i < elements.length; i++) {
            result += elements[i].getValue() * 1;
        }

        $el.find(params.resultInput).val(result);
    }

    $el.find(params.addButton).click(addElement);
    $el.find(params.calculateButton).click(calculateResult);
}
