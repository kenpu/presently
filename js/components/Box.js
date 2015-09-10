var store = require('../store');
var React = require('react');
var R = require('../registry');
var C = require('../constants');
var util = require('../util');
var BoxModel = require('../models/box')();
var _SelectableView = require('./_SelectableView');
var _DefaultView = require('./_DefaultView');
var Radium = require('radium');
var Styles = require('./styles');
var Assign = require('object-assign');

function make(model, i, ancestors, isFirst, editing) {
    var V = R.View(model.T);

    if(V) {
        return <V key={i} 
                  model={model} 
                  ancestors={ancestors} 
                  isFirst={isFirst}
                  editing={editing} />;
    } else {
        return (
            <div>Unknown model with type {model.T}</div>
        );
    }
}

var Box = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function(initStyle) {
        var box = this.props.model;
        var s = Assign(this.defaultStyle(), initStyle);

        if(box.orient == C("horizontal")) {
            s.flexDirection = 'row';
        } else {
            s.flexDirection = 'column';
        }

        if(box.children.length == 0) {
            s.minHeight = 50;
        }

        if(this.props.editing) {
            s = this.bordered(s);
            s = this.padded(s);
            if(this.isSelected()) {
                s = this.borderHighlight(s);
            }
        }

        return s;
    },
    render: function() {
        var box = this.props.model;
        var ancestors = this.props.ancestors;
        var editing = this.props.editing;

        var className = "prly-box prly-step";

        var children = box.children.map(function(model, i) {
            return make(model, i, ancestors.concat(box), 
                        (i == 0), // isfirst
                        editing);
        });

        var styles = [Styles.box.base, this.style()];

        return (
            <div className={className} style={styles} ref="element" >
                {children}
            </div>
        );
    },
});

Box = Radium(Box);

R.View(C('box'), Box);

module.exports = Box;
