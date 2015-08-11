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
    emitChange: function() {
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
});

module.exports = store;
