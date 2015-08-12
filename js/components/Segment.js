var React = require('react');
var Box = require('./Box');
var _SelectableView = require('./_SelectableView');
var R = require('../registry');
var C = require('../constants');

var Segment = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var segment = this.props.model;
        var segno = this.props.segno;
        var isFirst = this.props.isFirst;

        var leftMargin = 50;

        var style = {
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 0,
            paddingLeft: leftMargin,
            position: 'relative',
        };

        if(this.isSelected()) {
            style.border = "2px solid red";
        }

        if(isFirst) style.marginTop = 0;

        var segnoStyle = {
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            fontFamily: 'Ubuntu Mono',
            fontWeight: 'bold',
            padding: 5,
            width: leftMargin,
            textAlign: 'center',
        };

        var children = segment.children.map(function(box, i) {
            return <Box key={i} model={box} />;
        });

        return (
            <div className="prly-segment" style={style} ref="element" >
                <span style={segnoStyle}>{segno}</span>
                {children}
            </div>
        );
    },
});

R.View(C("segment"), Segment);

module.exports = Segment;
