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
