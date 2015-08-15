var C = require('../constants');
var util = require('../util');
var R = require('../registry');

function New(o) {
    return {
        T: C("box"),
        children: [],           // nested boxes
        orient: C("vertical"),  // orientation
    };
}

function Children(box, child) {
    return util.children(box, child);
}

function Orient(box, orientation) {
    return util.getset(box, "orient", orientation);
}

function Find(box, pred) {
    var results = [];

    box.children.forEach(function(c) {
        if(pred(c)) {
            results.push(c);
        } else if(c.T == C("box")) {
            Find(c, pred).forEach(function(x) {
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
