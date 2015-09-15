var React = require('react');
var Raw = require('./Raw');
var _SelectableView = require('./_SelectableView');
var _DefaultView = require('./_DefaultView');
var R = require('../registry');
var C = require('../constants');
var Styles = require('./styles');
var Radium = require('radium');

var Markdown = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function() {
        // hack, merge with Html.style(...)
        var model = this.props.model;

        var s = this.defaultStyle();
        if(model.source == "") {
            s.border = 'thin dotted #aaa';
        }

        if(this.props.editing)
            if(this.props.selected)
                s = this.bgHighlight(s);

        return s;
    },
    shouldComponentUpdate: function(nextprops, nextstate) {
        var update = false;
        if(this.props.markup != nextprops.markup || this.props.selected != nextprops.selected) {
            update = true;
        }
        return update
    },
    render: function() {
        console.info("Markdown render");
        var markdown = this.props.model;
        var config = this.props.config || {};

        var Model = R.Model(markdown.T);

        var source = Model.FormattedSource(markdown, {sidenotes: true});

        var mathjax = false;
        if (/^@math/m.exec(markdown.source)) {
            mathjax = true;
        }
        if(config.math || config.mathjax) mathjax = true;

        if(markdown.source.indexOf('$') < 0) {
            mathjax = false;
        }


        return (
            <Raw className="prly-markdown prly-panel" 
                 tag="div" 
                 source={source}
                 mathjax={mathjax}
                 style={[Styles.markdown, this.style()]} 
                 ref="element" />
        );
    },
});

Markdown = Radium(Markdown);

R.View(C("markdown"), Markdown);

module.exports = Markdown;
