var React = require('react');
var R = require('../registry');
var C = require('../constants');
var util = require('../util');
var Assign = require('object-assign');
var _SelectableView = require('./_SelectableView');

var Variant = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var variant = this.props.model;

        var style = {
            flex: 1
        };

        if(this.isSelected()) {
            style.background = '#ccc';
        }

        var result = util.parseSource(variant.source);

        var T;

        if(result.properties.markdown)
            T = C("markdown");

        else if(result.properties.html)
            T = C("html");

        else if(result.properties.codewalk)
            T = C("codewalk");

        var V;
        try {
            V = R.View(T);
        } catch(e) {
        }

        var view;
        if(V) {
            var model = R.Model(T).New();
            model.uuid = variant.uuid;

            // strip away the first line
            if(variant.source.startsWith('@')) {
                var index = variant.source.indexOf('\n');
                model.source = variant.source.substr(index+1);
            } else {
                model.source = variant.source;
            }

            view = (
                <V model={model} ancestors={this.props.ancestors}
                   style={this.props.style} readOnly />
            );
        } else {
            view = <pre>{variant.source}</pre>;
        }

        return (
            <div ref="element" style={style}>
                {view}
            </div>
        );
    },
});

R.View(C("variant"), Variant);

module.exports = Variant;
