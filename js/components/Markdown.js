var React = require('react');
var Raw = require('./Raw');
var _SelectableView = require('./_SelectableView');
var R = require('../registry');
var C = require('../constants');

var Markdown = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var markdown = this.props.model;

        var Model = R.Model(markdown.T);

        var source = Model.FormattedSource(markdown, {sidenotes: true});

        var style = {
            flex: 1,
            margin: 10,
        }

        if(this.isSelected()) {
            style.background = '#ccc';
        }

        return (
            <Raw className="prly-markdown" 
                 tag="div" 
                 source={source} 
                 style={style} 
                 ref="element" />
        );
    },
});

R.View(C("markdown"), Markdown);

module.exports = Markdown;
