var React = require('react');
var R = require('../registry');
var C = require('../constants');
var Raw = require('./Raw');

var Sidenote = React.createClass({
    render: function() {
        var model = this.props.model;

        var html = R.Model(C('markdown')).FormattedSource(
                model,
                {sidenotes: false});

        var style = {
            marginBottom: 10,
            paddingLeft: 15,
        };

        var labelStyle = {
            display: 'inline-block',
            float: 'left',
            clear: 'right',
            marginLeft: -style.paddingLeft,
            width: 10,
            height: 10,
            padding: 2,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
        };

        var id = "sidenote-" + model.uuid + "-" + model.index;

        return (
            <div className="prly-sidenote" style={style}>
                <span className="prly-sidenote-number" 
                      id={id}
                      style={labelStyle} >*</span>
                <Raw className="prly-sidenote" tag="div" source={html} />
            </div>
        );
    },
});

module.exports = Sidenote;
