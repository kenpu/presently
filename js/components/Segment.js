var React = require('react');
var Box = require('./Box');
var _SelectableView = require('./_SelectableView');

var Segment = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var segment = this.props.model;
        var segno = this.props.segno;
        var isFirst = this.props.isFirst;

        var style = {
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 0,
            paddingLeft: 50,
            position: 'relative',
        };

        if(isFirst) style.marginTop = 0;

        var segnoStyle = {
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            fontFamily: 'Ubuntu Mono',
            fontWeight: 'bold',
            padding: 5,
            border: 'thin solid #aaa',
        };

        var children = segment.children.map(function(box, i) {
            return <Box key={i} model={box} />;
        });

        return (
            <div className="prly-segment" style={style}>
                <span style={segnoStyle}>{segno}</span>
                {children}
            </div>
        );
    },
});

module.exports = Segment;
