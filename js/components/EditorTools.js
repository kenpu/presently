var React = require('react');

var Tools = React.createClass({
    render: function() {
        var style = this.props.style || {};

        return (
            <div style={style} >
            </div>
        );
    },
});

module.exports = Tools;
