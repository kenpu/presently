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


function copy(parent, model, before) {
}

module.exports = function(store) {
    return R.Model(C("generic"), {
        Move: move,
        Remove: remove,
        Copy: copy,
        Wrap: wrap,
    });
};
