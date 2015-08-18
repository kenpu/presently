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
    togglePreview: function() {
        var store = this.props.store;
        var ui = store.state().ui;

        ui.preview = ! ui.preview;

        store.emitChange();
    },
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

        var toggleBtnStyle = {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 10,
            display: 'inline-block',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            background: '#000',
            color: '#fff',
            padding: 4
        };

        var zoom, split;

        if(ui.preview) {
            zoom = 1.0;
            split = 1;
        } else {
            split = ui.screenSplit || 0.5;
            zoom = 1 / split;
            if(ui.zoom > 0) zoom = ui.zoom;
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

        var selection = state.selection;
        var selected = store.selected();

        if(selected && 
                (selected.source != null || selected.data != null)) {
            editor = (
                    <div style={editorStyle} >
                        <SourceEditor model={selected} />
                    </div>
            );

            toolStyle.height = '20%';
        }

        var previewLabel = (ui.preview) ? "EDIT" : "VIEW";

        return (
            <div className="prly-editor" style={topStyle} >
                <a href="#" style={toggleBtnStyle} 
                        onClick={this.togglePreview} >{previewLabel}</a>
                <div style={leftStyle} >
                    <div style={leftInnerStyle}>
                        <Article model={article} editing={! ui.preview} />
                    </div>
                </div>
                <div style={rightStyle} >
                    <Tools style={toolStyle} selection={selection} />
                    { editor }
                </div>
            </div>
        );
    },
});

function nop() {
}

module.exports = Editor;
