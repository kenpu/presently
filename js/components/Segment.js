var React = require('react');
var Box = require('./Box');
var Sidenote = require('./Sidenote');
var _SelectableView = require('./_SelectableView');
var R = require('../registry');
var C = require('../constants');

var Segment = React.createClass({
    mixins: [_SelectableView],
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

        var leftMargin = 50;

        var style = {
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
            marginBottom: 0,
            paddingLeft: leftMargin,
            position: 'relative',
            borderLeft: '2px solid transparent',
        };

        if(this.isSelected(true)) {
            style.borderLeft = "2px solid red";
        }

        if(! editing) {
            style.borderLeft = "none";
        }

        if(isFirst) style.marginTop = 0;

        // styling for the segment labels
        // ------------------------------
        var labelStyle = {
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            fontFamily: 'Ubuntu Mono',
            fontWeight: 'bold',
            padding: 5,
            width: leftMargin,
            textAlign: 'center',
        };

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

        var bodyStyle = {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            minHeight: 200,
        }

        var contentStyle = {
            flex: 4,
            display: 'flex',
        }
        var sidenoteStyle = {
            flex: 1,
        }

        if(segment.wide) {
            bodyStyle.flexDirection = 'column';
            if(noteModels.length == 0) {
                sidenoteStyle.display = 'none';
            }
        }

        return (
            <div className="prly-segment" style={style} ref="element" >
                <span style={labelStyle}>{label}</span>
                <div className="prly-segment-body" style={bodyStyle}>
                    <div style={contentStyle} ref="content">
                        {children}
                    </div>
                    <div style={sidenoteStyle} ref="sidenotes">
                        {sidenotes}
                    </div>
                </div>
            </div>
        );
    },
});

R.View(C("segment"), Segment);

module.exports = Segment;
