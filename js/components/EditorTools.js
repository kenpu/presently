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
        if(selection.length == 1) {
            var V = R.Toolbar(selection[0].T);

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
