var utils = {};

utils.renderTemplate = function(id) {
    var temp = $('#' + id).children();

    return temp.clone(true);
};
