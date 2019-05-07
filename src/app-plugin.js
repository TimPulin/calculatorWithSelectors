function Row(types) {
    var elementContainer = utils.renderTemplate('elementRow');
}

$.fn.appCalculator = function (params) {
    var $el = $(this);

    function calculateResult() {
        var result = 0;

        for (var i = 0; i < elements.length; i++) {
            result += elements[i].getValue() * 1;
        }

        $el.find(params.resultInput).val(result);
    }

    var elements = [];
    function addRow() {
        var nextIndex = elements.length;

        var elementContainer = utils.renderTemplate('elementRow');

        // Create select for types
        var options = params.types.map(function (item, index) {
            return '<option value="' + index + '">' + item.label +'</option>';
        });

        var $selectType = elementContainer.find('.element-type');
        $selectType
            .append(options)
            .change(() => {
                changeElementType($selectType, elementContainer, nextIndex)
            });
        $el.find(params.listContainer).append(elementContainer);
    }
    function changeElementType($selectType, elementContainer, nextIndex) {
        var elementCreatorIndex = $selectType.val();
        var el = params.types[elementCreatorIndex];

        var $myRow = utils.renderTemplate(el.templateId);
        var elementBlock = new el.Element($myRow);

        elementContainer.find('.content').html($myRow);

        elements[nextIndex] = elementBlock;
    }

    $el.find(params.addButton).click(addRow);
    $el.find(params.calculateButton).click(calculateResult);
}
