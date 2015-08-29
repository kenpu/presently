// The store module.
// Usage:
// var store = require('./store')
// store.state({
//   article: article,
//   otherStuff...
// });
//
// ...

var EventEmitter = require('events').EventEmitter;
var Assign = require('object-assign');

var state = {
    article: null,
    modified: false,
    selection: [],
    copy: null,
    history: [],
};

var MAX_UNDO = 5;

// clones the model according to the following rules:
// If the model is a container (children != undefined),
// then we clone it.
// If model is a leaf node, we just keep the reference to it.
function makeClone(model) {
    if(model.children != undefined) {
        var children = model.children.map(function(c) {
            return makeClone(c);
        });
        return Assign({}, model, {children: children});
    } else {
        return model;
    }
}

function saveHistory() {
    var history = state.history;

    if(history.length > MAX_UNDO) {
        history.length = MAX_UNDO;
    }
    var copied = makeClone(state.article);
    // remove heading copies
    var i = history.indexOf(state.article);
    if(i >= 0) {
        history.splice(0, i);
        history.splice(i+1, 0, copied);
    }
}

var store = Assign({}, EventEmitter.prototype, {
    emitChange: function(o) {
        o = Assign({}, o);
        if(! o.f) {
            throw "emitChange({f: ...})";
        }

        if(o.history) {
            saveHistory();
        }

        // invoke the update function
        if(o.self) o.f.call(o.self);
        else o.f();

        if(o.resetSelection) {
            state.selection.length = 0;
        }

        if(o.contentChange) {
            state.modified = true;
        }
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    state: function(o) {
        if(o != null) state = Assign(state, o);
        return state;
    },
    select: function(branch) {
        state.selection = branch;
    },
    selected: function(T) {
        if(! T) {
            return state.selection[state.selection.length-1];
        } else {
            for(var i in state.selection) {
                var model = state.selection[i];
                if(model.T == T) {
                    return model;
                }
            }
            return null;
        }
    },
    selectedParent: function() {
        return state.selection[state.selection.length-2];
    },
    isSelected: function(model, checkAll) {
        if(checkAll) {
            return(state.selection.indexOf(model) >= 0);
        } else {
            return(model == state.selection[state.selection.length - 1]);
        }
    },
    isCopied: function(model) {
        return state.copy == model;
    },
    undo: undo,
    redo: redo,
});

function undo() {
    var history = state.history;
    var i = history.indexOf(state.article);

    // restore history[i+1]
    if(i >= 0 && i < history.length - 1) {
        state.article = history[i+1];
        return true;
    } else {
        return false;
    }
}

function redo() {
    var history = state.history;
    var i = history.indexOf(state.article);

    // restore history[i-1]
    if(i > 0) {
        state.article = history[i-1];
        return true;
    } else {
        return false;
    }
}

// debug
window.store = store;

module.exports = store;
