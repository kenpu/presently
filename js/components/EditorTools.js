var React = require('react');
var ArticleTools = require('./ArticleTools');
var Assign = require('object-assign');
var store = require('../store');
var R = require('../registry');

var EditorTools = React.createClass({
    render: function() {
        var style = this.props.style || {};

        var selection = store.state().selection;

        var toolbar;
        var selected = store.selected();
        if(selected) {
            var V = R.Toolbar(selected.T);

            if(V)
                toolbar = <V />;
        }

        return (
            <div style={style} >
                <ArticleTools />               
                {toolbar}
            </div>
        );
    },
});

module.exports = EditorTools;
