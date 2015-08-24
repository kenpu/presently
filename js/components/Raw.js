var React = require('react');
var Radium = require('radium');

var Raw = React.createClass({
    postprocess: function() {
        var element = React.findDOMNode(this.refs.element);

        if(this.props.mathjax && window.MathJax) {
            console.debug("Mathjax queu");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
        }

        // mathjax
        // syntax highlighting
        // JS dom stuff (sidebar, audio)
    },
    componentDidMount: function() {
        this.postprocess();
    },
    componentDidUpdate: function() {
        this.postprocess();
    },
    render: function() {
        var source = this.props.source || this.props.html || "";
        var tag = this.props.tag || "div";
        var className = this.props.className;

        var style = this.props.style;

        var x = $('<div>' + source + '</div>');
        var html = x.html() 

        var element = React.createElement(tag, {
            dangerouslySetInnerHTML: {__html: html},
            ref: "element",
            style: style,
            className: className,
        });

        return element;
    },
});

module.exports = Radium(Raw);
