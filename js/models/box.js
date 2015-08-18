var C = require('../constants');
var util = require('../util');
var R = require('../registry');
var Assign = require('object-assign');

function New(o) {
    o = Assign({}, o);

    var model = {
        T: C("box"),
        children: [],           // nested boxes
        data: "",               // yaml
        orient: C("vertical"),  // orientation
    };

    if(o.markdown) {
        var markdown = R.Model(C("markdown")).New();
        model.children.push(markdown);
    }

    return model;
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

function Split(box, orient) {
    box.orient = orient;

    // wrap non-box children in boxes if necessary
    for(var i=0; i < box.children.length; i++) {
        var c = box.children[i];
        if(c.T != C("box")) {
            var wrapper = New();
            wrapper.children.push(c);
            box.children.splice(i, 1, wrapper);
        }
    }

    var b1 = New({markdown: true});
    if(box.children.length == 0) {
        var b2 = New({markdown: true});
        Children(box, [b1, b2]);
    } else {
        Children(box, [b1]);
    }
}

function Extend(parent, model, before) {
    var i = parent.children.indexOf(model);
    var newBox;
    if(i >= 0) {
        newBox = New({markdown: true});
        if(before) {
            parent.children.splice(i, 0, newBox);
        } else {
            parent.children.splice(i+1, 0, newBox);
        }
    }
    return newBox;
}

module.exports = function(store) {
    return R.Model("box", {
        New: New.bind(store),
        Children: Children.bind(store),
        Orient: Orient.bind(store),
        Find: Find,
        Split: Split,
        Extend: Extend,
    });
}
