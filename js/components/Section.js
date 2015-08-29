var React = require('react');
var Segment = require('./Segment');
var _SelectableView = require('./_SelectableView');
var _DefaultView = require('./_DefaultView');
var R = require('../registry');
var C = require('../constants');
var Radium = require('radium');
var Styles = require('./styles');
var Assign = require('object-assign');

var Section = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function() {
        var isFirst = this.props.isFirst;

        var s = {};
        var model = this.props.model;

        if(this.props.editing) {
            if(this.isSelected()) {
                s = Assign(s, Styles.section.selected);
            }
        }
        if(model.children.length == 0) {
            s = Assign(s, Styles.section.empty);
        }

        // add the divider border unless
        // it's part of the cover
        if(! this.props.isCover) {
            if(isFirst) {
                s.borderTop = 'none';
            } else {
                s.borderTop = '10px solid #aaa';
            }
        }

        return s;
    },
    render: function() {
        var section = this.props.model;
        var label = this.props.label;
        var editing = this.props.editing;
        var ancestors = this.props.ancestors;
        var isFirst = this.props.isFirst;
        var isCover = this.props.isCover;

        var sectionBody = section.children.map(function(segment, i, array) {
            var sublabel = (label) ? (label + "." + (i+1)) : null;
            return (
                <Segment key={i} 
                         editing={editing}
                         model={segment} 
                         ancestors={ancestors.concat(section)}
                         label={sublabel}
                         isFirst={i == 0}
                         isLast={i == array.length-1}
                         inFirstSection={isFirst}
                         isCover={isCover} />
            );
        });

        var styles = [Styles.section.base, this.style()];

        var data = this.parsed();
        var title;
        if(data.title) {
            title = (
                <div className="prly-section-title" style={Styles.section.title}>
                    <span style={Styles.section.titleLabel}>{label}</span>
                    <span>{data.title}</span>
                </div>
            );
        }

        return (
            <div className="prly-section" style={styles} ref="element">
                {title}
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
