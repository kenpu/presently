var React = require('react');
var Styles = require('./styles');
var C = require('../constants');
var R = require('../registry');
var util = require('../util');
var Radium = require('radium');
var _DefaultView = require('./_DefaultView');
var _SelectableView = require('./_SelectableView');
var Assign = require('object-assign');

var Image = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function() {
        var s = this.defaultStyle();
        var model = this.props.model;

        if(! model.src) {
            s = Assign(s, Styles.image.empty);
        }

        if(this.props.editing) {
            s = this.padded(s);
            if(this.isSelected()) {
                s = this.bordered(s);
                s = this.borderHighlight(s);
            }
        }

        return s;
    },
    render: function() {
        var model = this.props.model;
        var styles = [Styles.image.base, this.style()];

        var inner;
        if(model.src) {
            inner = (<img src={model.src} width="100%" />);
        } else {
            inner = (<div>Empty</div>);
        }

        var data = this.parsed();
        var caption;
        if(data.caption) {
            caption = (
                <figcaption style={Styles.image.caption}>{data.caption}</figcaption>
            );
        }

        return (
            <figure ref="element" style={styles} className="prly-panel">
                {inner}
                {caption}
            </figure>
        );
    },
});

Image = Radium(Image);

R.View(C("image"), Image);

module.exports = Image;
