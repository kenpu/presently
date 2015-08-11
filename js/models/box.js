var C = require('../constants');
var util = require('../util');

function New(o) {
    return {
        T: C("box"),
        children: [],           // nested boxes
        orient: C("vertical"),  // orientation
        css: {},                // CSS styling
    };
}

function Children(box, child) {
    return util.children(box, child);
}

function Orient(box, orientation) {
    return util.getset(box, "orient", orientation);
}

module.exports = function(store) {
    return {
        New: New.bind(store),
        Children: Children.bind(store),
        Orient: Orient.bind(store),
    };
}
