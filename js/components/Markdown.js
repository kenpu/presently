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

        /*
        if(! this.inHorizontal()) {
            s.flex = 'none';
        }
        */
        if(this.props.editing)
            if(this.isSelected())
                s = this.bgHighlight(s);

        return s;
    },
    render: function() {
        var markdown = this.props.model;

        var Model = R.Model(markdown.T);

        var source = Model.FormattedSource(markdown, {sidenotes: true});

        return (
            <Raw className="prly-markdown" 
                 tag="div" 
                 source={source} 
                 style={[Styles.markdown, this.style()]} 
                 ref="element" />
        );
    },
});

Markdown = Radium(Markdown);

R.View(C("markdown"), Markdown);

module.exports = Markdown;
