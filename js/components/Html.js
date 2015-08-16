var React = require('react');
var Raw = require('./Raw');
var R = require('../registry');
var C = require('../constants');
var _SelectableView = require('./_SelectableView');
var Styles = require('./styles');
var Radium = require('radium');
var _DefaultView = require('./_DefaultView');

var Html = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function() {
        var s = {};
        // hack.
        if(! this.inHorizontal()) {
            s.flex = 'none';
        }
        if(this.props.editing)
            if(this.isSelected())
                s = this.bgHighlight(s);
        return s;
    },
    render: function() {
        var html = this.props.model;

        return (
            <Raw tag="div" source={html.source} 
                style={[Styles.html, this.style()]} ref="element"/>
        );
    },
});

Html = Radium(Html);

R.View(C("html"), Html);

module.exports = Html;
