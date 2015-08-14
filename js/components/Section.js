var React = require('react');
var Segment = require('./Segment');
var _SelectableView = require('./_SelectableView');
var R = require('../registry');
var C = require('../constants');

var Section = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var section = this.props.model;
        var label = this.props.label;

        var sectionBody = section.children.map(function(segment, i) {
            return (
                <Segment key={i} 
                         model={segment} 
                         ancestors={[section]}
                         label={label + "." + (i+1)} 
                         isFirst={i == 0}/>
            );
        });

        var style = {
            width: "100%",
            marginBottom: 100,
        };

        var bodyStyle = {
        };

        if(this.isSelected()) {
            style.borderLeft = '5px solid blue';
        }

        var hdrStyle = {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            maxWidth: '80%',
            padding: 10,
        };

        return (
            <div className="prly-section" style={style} ref="element">
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

R.View(C("section"), Section);

module.exports = Section;
