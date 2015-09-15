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
        var f = function() {
            if(model.source != null)
                model.source = e.target.value;
            else if(model.data != null) {
                model.data = e.target.value;
            }
        }

        store.emitChange({
            f: f,
            contentChange: true,
        });
    },
    chgType: function(e) {
        var model = this.props.model;
        var newT = e.target.value;

        var f = function() {
            model.T = newT;
        }

        store.emitChange({
            f: f,
            contentChange: true,
        });
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
        } else {
            typeSelect = (
                <div style={labelStyle}>
                    <span>YAML</span>
                </div>
            );
        }

        var mode = (model.data != null) ? "yaml" : "markdown";
        if(model.T == C("markdown"))
            mode = "markdown";
        else if(model.T == C("html"))
            mode = "xml";

        var value = (model.data != null) ? model.data : model.source;

        return (
            <div className="prly-source-editor" 
                style={Styles.editor.source} >
                {typeSelect}
                <CodeMirror
                    value={value}
                    mode={mode}
                    onChange={this.update}
                    lineNumbers={true}
                    lineWrapping={true} />
            </div>
        );
    },
});

module.exports = SourceEditor;
