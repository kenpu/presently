var React = require('react');
var Segment = require('./Segment');
var _SelectableView = require('./_SelectableView');
var _DefaultView = require('./_DefaultView');
var R = require('../registry');
var C = require('../constants');
var Radium = require('radium');
var Styles = require('./styles');

var Section = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function() {
        if(this.isSelected()) {
            return {
                borderLeft: '5px solid blue',
            };
        }
    },
    render: function() {
        var section = this.props.model;
        var label = this.props.label;
        var editing = this.props.editing;

        var sectionBody = section.children.map(function(segment, i) {
            return (
                <Segment key={i} 
                         editing={editing}
                         model={segment} 
                         ancestors={[section]}
                         label={label + "." + (i+1)} 
                         isFirst={i == 0}/>
            );
        });

        var styles = [Styles.section.base, this.style()];

        return (
            <div className="prly-section" style={styles} ref="element">
                <div className="prly-section-body">
                    {sectionBody}
                </div>
            </div>
        );
    },
});

Section = Radium(Section);

R.View(C("section"), Section);

module.exports = Section;
