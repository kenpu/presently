var React = require('react');
var marked = require('marked');
var hl = require('highlight.js');
var Raw = require('./Raw');
var _SelectableView = require('./_SelectableView');
var R = require('../registry');
var C = require('../constants');

marked.setOptions({
    highlight: function(code) {
        return hl.highlightAuto(code).value;
    }
});

var Markdown = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var markdown = this.props.model;
        var source = marked(markdown.source);

        var style = {
            padding: 5,
            flex: 1,
        }

        if(this.isSelected()) {
            style.background = '#ccc';
        }

        return (
            <Raw className="prly-markdown" tag="div" source={source} style={style} ref="element" />
        );
    },
});

R.View(C("markdown"), Markdown);

module.exports = Markdown;
