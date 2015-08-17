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

var CodeSection = Radium(React.createClass({
    render: function() {
        var part = this.props.part;
        var isFirst = this.props.isFirst;

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

        var note;
        if(this.props.hasSidenotes) {
            note = (
                <Raw tag="div" 
                    html={sidenoteHtml}
                    style={[Styles.codewalk.side]} />
            );
        }

        return (
            <div style={[Styles.codewalk.section, style]}>
                <pre style={[Styles.codewalk.code]}>
                    <code>{code}</code>
                </pre>
                {note}
            </div>
        );
    },
}));

var Codewalk = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function() {
        var s = {};
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

        var result = R.Model(model.T).Parse(model);

        var body;
        body = result.parts.map(function(part, i) {
            return (
                <CodeSection part={part} 
                             key={i} 
                             isFirst={i == 0} 
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
