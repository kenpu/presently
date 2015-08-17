var React = require('react');
var R = require('../registry');
var C = require('../constants');
var store = require('../store');

var SegmentTools = React.createClass({
    newSegment: function(before) {
        var model = this.props.model;
        var parnet = this.props.parent;

        var Segment = R.Model(C("segment"));
        var newSegment = Segment.Insert(parent, model, before);

        // TODO: select newSegment

        store.emitChange();
    },
    toggleWide: function() {
        var model = this.props.model;
        model.wide = !(model.wide);

        store.emitChange();
    },
    getSidenoteStatus: function() {
        var model = this.props.model;

        if(model.wide) {
            return "ON";
        } else {
            return "OFF";
        }
    },
    render: function() {
        return (
            <table className="prly-tools">
                <tr>
                    <th>Segment</th>
                    <td>
                        <button onClick={this.newSegment.bind(this, true)} >Before</button>
                    </td>
                    <td>
                        <button onClick={this.newSegment.bind(this, false)} >After</button>
                    </td>
                    <td>
                        <button onClick={this.toggleWide} >
                            <span>Wide:{this.getSidenoteStatus()}</span>
                        </button>
                    </td>
                </tr>
            </table>
        );
    },
});

module.exports = R.Toolbar(C("segment"), SegmentTools);
