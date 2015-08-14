var React = require('react');
var store = require('../store');
var util = require('../util');
var R = require('../registry');
var C = require('../constants');
var _SelectableView = require('./_SelectableView');
var Raw = require('./Raw');

var CodeSection = React.createClass({
    render: function() {
        var part = this.props.part;
        var sideWidth = this.props.sideWidth || 0.3;
        var isFirst = this.props.isFirst;

        var sidenoteHtml = util.md2html(part.sidenote);
        var code = part.source;

        var style = {
            width: '100%',
            display: 'flex',
        };

        if(! isFirst) {
            style.borderTop = 'thin solid #aaa';
        }

        var sideStyle = {
            maxWidth: ((sideWidth * 100) + '%'),
            minWidth: ((sideWidth * 100) + '%'),
        };

        var codeStyle = {
            flex: 1,
            lineHeight: '140%',
        };

        return (
            <div style={style}>
                <pre style={codeStyle}><code>{code}</code></pre>
                <Raw tag="div" html={sidenoteHtml} style={sideStyle} />
            </div>
        );
    },
});

var Codewalk = React.createClass({
    mixins: [_SelectableView],
    render: function() {
        var model = this.props.model;
        var parent = this.props.parent;
        var isFirst = this.props.isFirst;

        var style = {
            padding: 10,
            margin: 10,
        };

        if(this.isSelected()) {
            style.background = '#ccc';
        }

        var codeStyle = {
            fontFamily: 'Ubuntu Mono',
        };

        var result = R.Model(model.T).Parse(model);

        var body;
        body = result.parts.map(function(part, i) {
            return (
                <CodeSection part={part} key={i} isFirst={i == 0}/>
            );
        });

        return (
            <div ref="element" style={style} >
                {body}
            </div>
        );
    
    },
});


R.View(C('codewalk'), Codewalk);

module.exports = Codewalk;
