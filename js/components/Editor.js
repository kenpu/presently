var React = require('react');
var Article = require('./Article');
var Tools = require('./EditorTools');
var _ActiveView = require('./_ActiveView');

/*
var brace = require('brace');
var AceEditor = require('react-ace');

require('brace/mode/python');
require('brace/theme/github');
*/

var Editor = React.createClass({
    mixins: [_ActiveView],
    render: function() {
        var store = this.props.store;

        var state = store.state();

        var article = state.article;
        var ui = state.ui;

        var topStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background: '#333',
        };

        var split = ui.screenSplit || 0.5;

        var leftStyle = {
            position: 'fixed',
            width: (split * 100) + "%",
            height: '100%',
            left: 0,
            top: 0,
            background: '#fff',
            overflowY: 'scroll',
        };

        var zoom = ui.zoom || (1 / split);
        var scale = 1 / zoom;

        var leftInnerStyle = {
            WebkitTransform: 'scale(' + scale + ')',
            WebkitTransformOrigin: '0 0',
            transform: 'scale(' + scale + ')',
            transformOrigin: '0 0',
            width: (zoom * 100) + '%',
        };

        var rightStyle = {
            position: 'fixed',
            width: ((1 - split) * 100) + '%',
            height: '100%',
            right: 0,
            top: 0,
            background: '#aff',
        };

        var toolStyle = {
            width: '100%',
            height: '100%', // might be updated by editor
            background: '#fff',
            boxSizing: 'border-box',
            borderBottom: '1px solid #aaa',
        };

        var editorStyle = {
            width: '100%',
            height: '80%',
            fontFamily: 'Ubuntu Mono',
            border: 'none',
            outline: 'none',
        };

        var editor;

        var selection = store.state().selection;
        if(selection.length == 1 && selection[0].source != null) {
            var selected = selection[0];

            var update = function(e) {
                var newval = e.target.value;
                selected.source = newval;
                store.emitChange();
            };

            /*
            editor = (
                <AceEditor
                    mode="python"
                    theme="github"
                    name="EDITOR"
                    width="100%"
                    height="80%"
                    fontSize="12pt"
                    showGutter={false}
                    showPrintMargin={false}
                    value={selected.source}
                    onChange={update} />
            );
            */
            editor = (
                <textarea id="source-editor"
                          style={editorStyle} 
                          onChange={update} 
                          value={selected.source}/>
            );

            toolStyle.height = '20%';
        }

        return (
            <div className="prly-editor" style={topStyle} >
                <div style={leftStyle} >
                    <div style={leftInnerStyle}>
                        <Article model={article} />
                    </div>
                </div>
                <div style={rightStyle} >
                    <Tools style={toolStyle} />
                    { editor }
                </div>
            </div>
        );
    },
});

function nop() {
}

module.exports = Editor;
