var C = require('../constants');
var util = require('../util');
var R = require('../registry');
var Assign = require('object-assign');

function move(parent, model, before) {
    if(parent && model) {
        var i = parent.children.indexOf(model);
        if(i >= 0) {
            if(before && i > 0) {
                var prev = parent.children[i-1];
                parent.children.splice(i-1, 2, model, prev);
            } else if((!before) && i < parent.children.length-1) {
                var next = parent.children[i+1];
                parent.children.splice(i, 2, next, model);
            }
        }
        return true;
    }
}

function remove(parent, model) {
    if(parent && model) {
        var i = parent.children.indexOf(model);
        if(i >= 0) {
            parent.children.splice(i, 1);
            return true;
        }
    }
}

function copy(parent, model, before) {
}

module.exports = function(store) {
    return R.Model(C("generic"), {
        Move: move,
        Remove: remove,
        Copy: copy,
    });
};
