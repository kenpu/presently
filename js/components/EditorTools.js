var React = require('react');
var ArticleTools = require('./ArticleTools');
var Assign = require('object-assign');
var store = require('../store');
var R = require('../registry');
var C = require('../constants');

var EditorTools = React.createClass({
    render: function() {
        var style = this.props.style || {};

        var selection = store.state().selection;

        var segtoolbar;
        var selsegment = store.selected(C("segment"));
        var selsection = store.selected(C("section"));
        if(selsegment) {
            var V = R.Toolbar(selsegment.T);
            if(V) segtoolbar = <V model={selsegment} parent={selsection} />;
        }

        var toolbar;
        var selected = store.selected();
        if(selected && selected.T != C("segment")) {
            var V = R.Toolbar(selected.T);
            var parent = store.selectedParent();

            if(V)
                toolbar = <V model={selected} parent={parent} />;
        }

        return (
            <div style={style} >
                <ArticleTools />
                {segtoolbar}
                {toolbar}
            </div>
        );
    },
});

module.exports = EditorTools;
