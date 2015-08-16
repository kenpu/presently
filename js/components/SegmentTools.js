var React = require('react');
var R = require('../registry');
var C = require('../constants');
var store = require('../store');

var SegmentTools = React.createClass({
    newSegment: function(before) {
        var selectedSection = store.selected(C("section"));
        var selectedSegment = store.selected(C("segment"));

        var Segment = R.Model(C("segment"));
        var newSegment = Segment.Insert(selectedSection, selectedSegment, before);

        // TODO: select newSegment

        store.emitChange();
    },
    toggleWide: function() {
        var selectedSegment = store.selected(C("segment"));
        selectedSegment.wide = !(selectedSegment.wide);

        store.emitChange();
    },
    getSidenoteStatus: function() {
        var selectedSegment = store.selected(C("segment"));
        if(selectedSegment.wide) {
            return "ON";
        } else {
            return "OFF";
        }
    },
    render: function() {
        return (
            <table className="prly-tools">
                <tr>
                    <th style={{border: 'none'}}>
                        New Segment
                    </th>
                    <td>
                        <button onClick={this.newSegment.bind(this, true)} >Before</button>
                    </td>
                    <td>
                        <button onClick={this.newSegment.bind(this, false)} >After</button>
                    </td>
                </tr>
                <tr>
                    <th style={{border: 'none'}}>
                       <span>Configure</span>
                    </th>
                    <td colSpan={2}>
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
