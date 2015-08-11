var React = require('react');
var Article = require('./Article');
var Tools = require('./EditorTools');
var brace = require('brace');
var AceEditor = require('react-ace');

require('brace/mode/python');
require('brace/theme/github');

var Editor = React.createClass({
    render: function() {
        var store = this.props.store;
        var article = store.state().article;

        var topStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            background: '#333',
        };

        var leftStyle = {
            position: 'fixed',
            width: '50%',
            height: '100%',
            left: 0,
            top: 0,
            background: '#fff',
            overflowY: 'scroll',
        };

        var leftInnerStyle = {
            WebkitTransform: 'scale(0.5)',
            WebkitTransformOrigin: '0 0',
            width: '200%',
        };

        var rightStyle = {
            position: 'fixed',
            width: '50%',
            height: '100%',
            right: 0,
            top: 0,
            background: '#aff',
        };

        var toolStyle = {
            width: '100%',
            height: '20%',
            background: '#fff',
            boxSizing: 'border-box',
            borderBottom: '1px solid #aaa',
        };

        return (
            <div className="prly-editor" style={topStyle} >
                <div style={leftStyle} >
                    <div style={leftInnerStyle}>
                        <Article model={article} />
                    </div>
                </div>
                <div style={rightStyle} >
                    <Tools style={toolStyle}/>
                    <AceEditor
                        mode="python"
                        theme="github"
                        name="EDITOR"
                        width="100%"
                        height="80%"
                        fontSize="12pt"
                        showGutter={false}
                        showPrintMargin={false}
                        onChange={nop} />
                </div>
            </div>
        );
    },
});

function nop() {
}

module.exports = Editor;
