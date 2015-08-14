var C = require('../constants');
var util = require('../util');
var R = require('../registry');

function New(o) {
    return {
        T: C("box"),
        children: [],           // nested boxes
        source: "",             // special formatting instructions
                                // and annotations
        orient: C("vertical"),  // orientation
    };
}

function Children(box, child) {
    return util.children(box, child);
}

function Orient(box, orientation) {
    return util.getset(box, "orient", orientation);
}

function Find(box, t) {
    var results = [];

    box.children.forEach(function(c) {
        if(c.T == t) {
            results.push(c);
        } else if(c.T == C("box")) {
            Find(c, t).forEach(function(x) {
                results.push(x);
            });
        }
    });

    return results;
}

module.exports = function(store) {
    return R.Model("box", {
        New: New.bind(store),
        Children: Children.bind(store),
        Orient: Orient.bind(store),
        Find: Find,
    });
}
