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
    selection: [],
};
var store = Assign({}, EventEmitter.prototype, {
    emitChange: function(o) {
        o = Assign({}, o);
        if(o.resetSelection) {
            state.selection.length = 0;
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
});

// debug
window.store = store;

module.exports = store;
