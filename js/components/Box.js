var store = require('../store');
var React = require('react');
var Markdown = require('./Markdown');
var Html = require('./Html');
var C = require('../constants');
var BoxModel = require('../models/box')();
var _SelectableView = require('./_SelectableView');

// TODO: needs to change to a dynamic loading lookup table
function make(model, i, parent, isFirst) {
    switch(model.T) {
        case C("box"):
            return (
            <Box key={i} model={model} parent={parent} isFirst={isFirst} />
        );
        case C("markdown"):
            return (
                <Markdown key={i} model={model} parent={parent} isFirst={isFirst} />
            );
        case C("html"):
            return (
                <Html key={i} model={model} parent={parent} isFirst={isFirst} />
            );
        default:
            return (
                <div>Unknown model with type {model.T}</div>
            );
    }
}

var Box = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var box = this.props.model;
        var parent = this.props.parent;
        var isFirst = this.props.isFirst;

        // compute the margins
        var ml, mr, mt, mb;
        if(BoxModel.Orient(parent) == C("horizontal")) {
            ml = (isFirst) ? 10 : 0;
            mr = mt = mb = 10;
        } else {
            mt = (isFirst) ? 10 : 0;
            mb = ml = mr = 10;
        }

        var style = {
            display: "flex",
            flex: 1,
            border: "thin solid",
            borderColor: "#aaa",
            marginLeft: ml,
            marginRight: mr,
            marginTop: mt,
            marginBottom: mb,
        };

        if(this.isSelected()) {
            style.borderColor = 'red';
        }

        var className = "prly-box";

        if(box.orient == C("horizontal")) {
            style.flexDirection = 'row';
        } else {
            style.flexDirection = 'column';
        }

        if(box.children.length == 0) {
            style.minHeight = 50;
        }

        var children = box.children.map(function(model, i) {
            return make(model, i, box, (i == 0));
        });

        return (
            <div className={className} style={style} ref="element">
                {children}
            </div>
        );
    },
});

module.exports = Box;
