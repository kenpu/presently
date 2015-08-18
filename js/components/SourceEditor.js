var React = require('react');
var C = require('../constants');
var Styles = require('./styles');

var CodeMirror = require('react-code-mirror');
require('codemirror/mode/yaml/yaml');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

var SourceEditor = React.createClass({
    update: function(e) {
        var model = this.props.model;

        // update the appropriate field
        if(model.source != null)
            model.source = e.target.value;
        else if(model.data != null) {
            model.data = e.target.value;
        }

        store.emitChange();
    },
    chgType: function(e) {
        var model = this.props.model;
        var newT = e.target.value;
        model.T = newT;
        store.emitChange();
    },
    render: function() {
        var model = this.props.model;
        var style = {
            height: '100%',
            display: 'flex',
        };
        var labelStyle = {
            marginTop: -15,
        };

        var typeSelect;
        
        if(model.source != null) {
            typeSelect = (
                <div style={labelStyle}>
                    <select 
                        style={Styles.toolSelect} 
                        value={model.T}
                        onChange={this.chgType} >
                        <option value={C("markdown")}>Markdown</option>
                        <option value={C("codewalk")}>Codewalk</option>
                        <option value={C("html")}>HTML</option>
                        <option value={C("variant")}>Variant</option>
                    </select>
                </div>
            );
        }

        mode = (model.data != null) ? "yaml" : "markdown";
        if(model.T == C("markdown"))
            mode = "markdown";
        else if(model.T == C("html"))
            mode = "xml";

        return (
            <div className="prly-source-editor">
                {typeSelect}
                <CodeMirror
                    value={model.source}
                    mode={mode}
                    onChange={this.update}
                    lineNumbers={true}
                    lineWrapping={true} />
            </div>
        );
    },
});

/*
var AceEditor = require('react-ace');
require('brace/mode/text');
require('brace/theme/github');

var SourceEditor = React.createClass({
    onload: function() {
        ;
    },
    update: function(newVal) {
        var model = this.props.model;
        model.source = newVal;
        store.emitChange();
    },
    render: function() {
        var model = this.props.model;

        return (
            <div>
                <AceEditor
                    width="100%"
                    value={model.source}
                    onLoad={this.onload}
                    onChange={this.update}
                    mode="text"
                    theme="github" />
            </div>
        );
    },
});
*/

module.exports = SourceEditor;
