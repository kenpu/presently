var React = require('react');
var Raw = require('./Raw');
var _SelectableView = require('./_SelectableView');

var Html = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var html = this.props.model;

        return (
            <Raw tag="div" source={html.source} />
        );
    },
});

module.exports = Html;
