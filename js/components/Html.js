var React = require('react');
var Raw = require('./Raw');
var R = require('../registry');
var C = require('../constants');
var _SelectableView = require('./_SelectableView');

var Html = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var html = this.props.model;
        var editing = this.props.editing;

        var style = {
            flex: 1,
            margin: 10,
        };

        if(this.isSelected()) {
            style.background = '#eee';
        }

        if(! editing) {
            style.background = 'transparent';
        }

        return (
            <Raw tag="div" source={html.source} style={style} ref="element"/>
        );
    },
});

R.View(C("html"), Html);

module.exports = Html;
