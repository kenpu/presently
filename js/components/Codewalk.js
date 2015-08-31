var React = require('react');
var store = require('../store');
var util = require('../util');
var R = require('../registry');
var C = require('../constants');
var _SelectableView = require('./_SelectableView');
var _DefaultView = require('./_DefaultView');
var Raw = require('./Raw');
var Styles = require('./styles');
var Radium = require('radium');
var hl = require('highlight.js');

var CodeSection = Radium(React.createClass({
    render: function() {
        var part = this.props.part;
        var isFirst = this.props.isFirst;
        var lang = this.props.lang;

        var sidenoteHtml = util.md2html(part.sidenote);
        var code = part.source;

        var style = null;
        if(! isFirst) {
            style = {
                borderTopWidth: 'thin',
                borderTopStyle: 'solid',
                borderTopColor: '#aaa',
            }
        }

        var codeElem, noteElem;

        var mathjax = (! this.props.editing);

        if(this.props.hasSidenotes) {
            noteElem = (
                <Raw tag="div" 
                    source={sidenoteHtml}
                    mathjax={mathjax}
                    style={[Styles.codewalk.side]} />
            );
        }

        if(lang.startsWith && lang.startsWith('math')) {
            mathjax = true;
            codeElem = <Raw tag="pre" source={code} mathjax={mathjax} style={Styles.codewalk.pre} className="prly-code mathjax" />
        } else {
            try {
                var hlCode = hl.highlight(lang, code);
                code = hlCode.value;
            } catch(e) {
                ;
            }
            
            codeElem = (
                <pre className="prly-code hljs"
                    style={Styles.codewalk.pre}>
                    <code dangerouslySetInnerHTML={{__html: code}} /> 
                </pre>
            );
        }
        return (
            <div    style={[Styles.codewalk.section, style]}
                    className="prly-panel">
                {codeElem}
                {noteElem}
            </div>
        );
    },
}));

var Codewalk = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function() {
        var s = this.defaultStyle();
        var model = this.props.model;

        if(model.source == "") {
            s.border = 'thin dotted #aaa';
        }

        if(this.props.editing) {
            s = (this.padded(s));
            if(this.isSelected()) {
                s = this.bgHighlight(s);
            }
        }

        return s;
    },
    render: function() {
        var model = this.props.model;
        var parent = this.props.parent;
        var isFirst = this.props.isFirst;
        var editing = this.props.editing;

        var result = R.Model(C("codewalk")).Parse(model);

        var body;
        var lang = result.properties.lang || "python";
        body = result.parts.map(function(part, i) {
            return (
                <CodeSection part={part} 
                             lang={lang}
                             key={i} 
                             isFirst={i == 0} 
                             editing={editing}
                             hasSidenotes={result.hasSidenotes} />
            );
        });

        var styles = [Styles.codewalk.base, this.style()];

        return (
            <div ref="element" style={styles} >
                {body}
            </div>
        );
    
    },
});

Codewalk = Radium(Codewalk);

R.View(C('codewalk'), Codewalk);

module.exports = Codewalk;
