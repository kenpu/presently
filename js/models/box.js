var C = require('../constants');
var util = require('../util');

function New(o) {
    return {
        T: C("box"),
        children: [],           // nested boxes
        content: null,          // or containing a content widget
        source: "",             // special formatting instructions
                                // and annotations
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

function Content(box, content) {
    return util.getset(box, "content", content);
}

function IsLayout(box) {
    return box.content == null;
}

module.exports = function(store) {
    return {
        New: New.bind(store),
        Children: Children.bind(store),
        Orient: Orient.bind(store),
        Content: Content.bind(store),
        IsLayout: IsLayout,
    };
}
