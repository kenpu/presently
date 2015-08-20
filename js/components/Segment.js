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
        var isFirst = this.props.isFirst;
        var s = this.defaultStyle();
        if(isFirst) {
            s.borderTop = '1px solid transparent';
        }
        if(this.props.editing) {
            if(this.isSelected(true)) {
                s.borderLeft = '2px solid red';
            }
        }

        return s;
    },
    labelSidenotes: function() {
        // get the anchors
        var content = React.findDOMNode(this.refs.content);
        var anchors = $("span.prly-anchor-number", content);
        var counter = 0;
        anchors.each(function() {
            var anchor = $(this);
            var uuid = anchor.data('uuid');
            var index = anchor.data('index');
            var label = anchor.data('label');

            var sidenote_id = "#sidenote-" + uuid + "-" + index;
            if(label) {
                counter += 1;
                $(sidenote_id).html(counter);
                anchor.html('<sup>' + counter + '</sup>');
            }
        });
    },
    componentDidMount: function() {
        this.labelSidenotes();
    },
    componentDidUpdate: function() {
        this.labelSidenotes();
    },
    render: function() {
        var segment = this.props.model;
        var ancestors = this.props.ancestors;
        var label = this.props.label;
        var editing = this.props.editing;

        var children = segment.children.map(function(box, i) {
            return <Box key={i} 
                        model={box} 
                        ancestors={ancestors.concat(segment)} 
                        editing={editing} />;
        });

        // Parse the markdown source codes and extract all the
        // sidenotes.

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

        // Build the list of sidenotes.
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

        }

        if(noteModels.length == 0) {
            sideStyle = {
                display: 'none'
            };
        }

        var styles = [Styles.segment.base, this.style()];

        var className = "prly-segment";
        if(segment.layout) {
            className += " " + segment.layout;
        }

        return (
            <div className={className} style={styles} ref="element" >
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
