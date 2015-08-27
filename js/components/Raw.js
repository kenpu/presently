var React = require('react');
var Radium = require('radium');

var Raw = React.createClass({
    postprocess: function() {
        var element = React.findDOMNode(this.refs.element);

        if(this.props.mathjax && window.MathJax) {
            console.debug("Mathjax queued");
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
    shouldComponentUpdate: function(nextprops, nextstate) {
        var update = false;
        var p1 = JSON.stringify(this.props.style);
        var p2 = JSON.stringify(nextprops.style);

        if(this.props.source != nextprops.source || p1 != p2) {
            update = true
        }

        return update;
    },
    render: function() {
        var source = this.props.source || "";
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
