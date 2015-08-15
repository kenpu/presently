var store = require('../store');
var React = require('react');
var R = require('../registry');
var C = require('../constants');
var BoxModel = require('../models/box')();
var _SelectableView = require('./_SelectableView');

function make(model, i, ancestors, isFirst) {
    var V = R.View(model.T);

    if(V) {
        return <V key={i} 
                  model={model} 
                  ancestors={ancestors} 
                  isFirst={isFirst} />;
    } else {
        return (
            <div>Unknown model with type {model.T}</div>
        );
    }
}

var Box = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var box = this.props.model;
        var ancestors = this.props.ancestors;
        var isFirst = this.props.isFirst;

        var parent = ancestors[ancestors.length-1];

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
            minHeight: 20,
        };

        if(this.isSelected()) {
            style.borderColor = 'red';
        }

        var className = "prly-box";

        var children;

        if(box.orient == C("horizontal")) {
            style.flexDirection = 'row';
        } else {
            style.flexDirection = 'column';
        }
        if(box.children.length == 0) {
            style.minHeight = 50;
        }

        children = box.children.map(function(model, i) {
            return make(model, i, ancestors.concat(box), (i == 0));
        });

        return (
            <div className={className} style={style} ref="element">
                {children}
            </div>
        );
    },
});

R.View(C('box'), Box);

module.exports = Box;
