var React = require('react');
var Article = require('./Article');
var Tools = require('./EditorTools');
var _ActiveView = require('./_ActiveView');
var SourceEditor = require('./SourceEditor');

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

        var zoom, split;



        if(ui.preview) {
            zoom = 1.0;
            split = 1;
        } else {
            zoom = ui.zoom || (1 / split);
            split = ui.screenSplit || 0.5;
        }

        var scale = 1 / zoom;

        var leftStyle, leftInnerStyle, righStyle, toolStyle, editorStyle;

        leftStyle = {
            position: 'fixed',
            width: (split * 100) + "%",
            height: '100%',
            left: 0,
            top: 0,
            background: '#fff',
            overflowY: 'scroll',
        };

        leftInnerStyle = {
            WebkitTransform: 'scale(' + scale + ')',
            WebkitTransformOrigin: '0 0',
            transform: 'scale(' + scale + ')',
            transformOrigin: '0 0',
            width: (zoom * 100) + '%',
        };

        if(ui.preview) {
            rightStyle = {
                display: 'none',
            };
        } else {
            rightStyle = {
                position: 'fixed',
                width: ((1 - split) * 100) + '%',
                height: '100%',
                right: 0,
                top: 0,
                background: '#aff',
            };
        }

        toolStyle = {
            width: '100%',
            height: '100%', // might be updated by editor
            background: '#fff',
            boxSizing: 'border-box',
            borderBottom: '1px solid #aaa',
        };

        editorStyle = {
            width: '100%',
            height: '80%',
            fontFamily: 'Ubuntu Mono',
            border: 'none',
            outline: 'none',
            background: '#aaa',
            minHeight: '200px',
        };

        var editor;

        var selected = store.selected();
        if(selected && selected.source != null) {
            editor = (
                    <div style={editorStyle} >
                        <SourceEditor model={selected} />
                    </div>
            );

            toolStyle.height = '20%';
        }

        return (
            <div className="prly-editor" style={topStyle} >
                <div style={leftStyle} >
                    <div style={leftInnerStyle}>
                        <Article model={article} editing={! ui.preview} />
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
