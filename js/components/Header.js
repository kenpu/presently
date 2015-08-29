var React = require('react');
var Styles = require('./styles');
var Section = require('./Section');

var HeaderFooter = React.createClass({
    render: function() {
        var cover = this.props.model;
        var header = this.props.header;

        var className = (header) ? "prly-header" : "prly-footer";
        var i = (header) ? 0 : 1;
        var el;
        if(cover && cover.children && cover.children.length > i) {
            el = <Section 
                    isCover={true}
                    model={cover.children[i]} 
                    ancestors={[]} />
        }

        return (
            <div className={className}>{el}</div>
        );
    },
});

module.exports = HeaderFooter;
