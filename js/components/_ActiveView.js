var React = require('react');
var store = require('../store');

module.exports = {
    getInitialState: function() {
        return store.state();
    },
    update: function() {
        this.setState(store.state());
    },
    componentDidMount: function() {
        store.addChangeListener(this.update);
    },
    componentDidUnmount: function() {
        store.removeChangeListener(this.update);
    },
};
