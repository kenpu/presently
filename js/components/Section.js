var React = require('react');
var Segment = require('./Segment');
var _SelectableView = require('./_SelectableView');

var Section = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var section = this.props.model;
        var secno = this.props.secno;

        var sectionBody = section.children.map(function(segment, i) {
            return (
                <Segment key={i} model={segment} segno={secno + "." + (i+1)} isFirst={i == 0}/>
            );
        });

        var style = {
            width: "100%",
            marginBottom: 100,
        };

        var bodyStyle = {
        };

        var hdrStyle = {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            maxWidth: '80%',
            padding: 10,
        };

        return (
            <div className="prly-section" style={style}>
                <div className="prly-section-prelude" style={hdrStyle}>
                    <p>{section.prelude}</p>
                </div>
                <div className="prly-section-body" style={bodyStyle}>
                    {sectionBody}
                </div>
            </div>
        );
    },
});

module.exports = Section;
