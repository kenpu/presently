var React = require('react');
var R = require('../registry');
var C = require('../constants');
var util = require('../util');

var Variant = React.createClass({
    render: function() {
        var model = this.props.model;

        var result = util.parseSource(model.source);
        var T = C("markdown");
        if(result.properties.markdown)
            T = C("markdown");
        else if(result.properties.html)
            T = C("html");
        else if(result.properties.codewalk)
            T = C("codewalk");

        var V = R.View(T);
        model = R.Model(T).New();
        model.source = model.source;

        return <V model={model}
                  ancestors={this.props.ancestors}
                  style={this.props.style} />;
    },
});
