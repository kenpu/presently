var React = require('react');
var Box = require('./Box');
var Sidenote = require('./Sidenote');
var _SelectableView = require('./_SelectableView');
var _DefaultView = require('./_DefaultView');
var R = require('../registry');
var C = require('../constants');
var Styles = require('./styles');
var Radium = require('radium');

var Segment = React.createClass({
    mixins: [_DefaultView, _SelectableView],
    style: function() {
        var s = {};
        if(this.props.editing) {
            if(this.isSelected(true)) {
                s.borderLeft = '2px solid red';
            }
        }

        return s;
    },
    orderSidenotes: function() {
        // get the anchors
        var content = React.findDOMNode(this.refs.content);
        var anchors = $("span.prly-anchor-number", content);

        anchors.each(function(i) {
            var anchor = $(this);
            var uuid = anchor.attr('markdown-uuid');
            var index = anchor.attr('index');

            var sidenote_id = "#sidenote-" + uuid + "-" + index;
            $(sidenote_id).html(i+1);
            anchor.html('<sup>' + (i+1) + '</sup>');
        });
    },
    componentDidMount: function() {
        this.orderSidenotes();
    },
    componentDidUpdate: function() {
        this.orderSidenotes();
    },
    render: function() {
        var segment = this.props.model;
        var ancestors = this.props.ancestors;
        var label = this.props.label;
        var isFirst = this.props.isFirst;
        var editing = this.props.editing;

        var children = segment.children.map(function(box, i) {
            return <Box key={i} 
                        model={box} 
                        ancestors={ancestors.concat(segment)} 
                        editing={editing} />;
        });

        // Only markdown currently supports sidenote
        var noteModels = [];
        var BoxModel = R.Model(C("box"));
        var markdownModels = BoxModel.Find(segment, function(model) {
            return model.T == C("markdown") || 
               (model.T == C("variant") 
                    && model.source.startsWith("@markdown"));
        });

        markdownModels.forEach(function(md) {
            R.Model(C("markdown")).Sidenotes(md).forEach(
                function(note) {
                    noteModels.push(note);
                }
            );
        });

        var sidenotes = noteModels.map(function(note, i) {
            return <Sidenote model={note} key={i} />;
        });

        // styling for the segment body
        // ----------------------------

        var bodyStyle, sideStyle;

        if(segment.wide) {
            bodyStyle = {
                flexDirection: 'column'
            };

            if(noteModels.length == 0) {
                sideStyle = {
                    display: 'none'
                };
            }
        }

        var styles = [Styles.segment.base, this.style()];
        return (
            <div className="prly-segment" style={styles} ref="element" >
                <span style={Styles.segment.label}>{label}</span>
                <div className="prly-segment-body" 
                     style={Styles.segment.body}>
                    <div style={[Styles.segment.content, bodyStyle]}
                         ref="content">
                        {children}
                    </div>
                    <div style={[Styles.segment.sidenote, sideStyle]}
                         ref="sidenotes">
                        {sidenotes}
                    </div>
                </div>
            </div>
        );
    },
});

Segment = Radium(Segment);

R.View(C("segment"), Segment);

module.exports = Segment;
