var React = require('react');
var store = require('../store');

module.exports = {
    isSelected: function() {
        var selection = store.state().selection;
        var model = this.props.model;

        return(selection.indexOf(model) >= 0);
    },
    componentDidMount: function() {
        var model = this.props.model;
        var el = React.findDOMNode(this.refs.element);
        var self = this;
        $(el).click(function(e) {
            e.stopPropagation();
            var selection = store.state().selection;
            selection.length = 0;
            selection.push(model);
            console.debug("selected...");
            store.emitChange();
        });
    },
};
