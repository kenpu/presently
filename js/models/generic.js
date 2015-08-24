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

// removes the model from its parent.
// We ensure to involve the cleanup for all descendants of model.
function remove(parent, model) {
    if(parent && model) {
        var i = parent.children.indexOf(model);
        if(i >= 0) {
            parent.children.splice(i, 1);

            // cleanup the descendants
            cleanup(model);
            return true;
        }
    }
}


function wrap(parent, model) {
    if(parent && model) {
        var i = parent.children.indexOf(model);
        if(i >= 0) {
            var wrapper = R.Model(C("box")).New();
            wrapper.children.push(model);
            parent.children.splice(i, 1, wrapper);
        }
    }
}


function cleanup(model) {
    if(model.children)
        model.children.forEach(function(x) {
            cleanup(x);
        });

    var Model = R.Model(model.T);
    if(Model && Model.Cleanup) {
        Model.Cleanup(model);
    }
}


function copyModel(model) {
    this.state().copy = model;
}

function canPasteInto(parent) {
    var copy = this.state().copy;

    if(! copy) return false;
    if(! parent.children) return false;

    if(parent.T == C("section"))
        return copy.T == C("segment");

    if(parent.T == C("segment"))
        return copy.T == C("box");

    return true;
}

function paste(parent) {
    if(canPasteInto.call(this, parent)) {
        var copy = this.state().copy;
        parent.children.push(clone(copy));
        this.state().copy = null;
    }
}

function clone(model) {
    // recursively clone the model
    if(model.children) {
        var children = model.children.map(function(child) {
            return clone(child);
        });

        return Assign({}, model, {children: children});
    } else {
        return Assign({}, model);
    }
}

module.exports = function(store) {
    return R.Model(C("generic"), {
        Move: move,
        Remove: remove,
        Copy: copyModel.bind(store),
        Wrap: wrap,
        Paste: paste.bind(store),
        CanPasteInto: canPasteInto.bind(store),
    });
};
