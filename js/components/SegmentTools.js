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
    render: function() {
        return (
            <table className="prly-tools">
                <tr>
                    <td style={{border: 'none'}}>
                        <span>New Segment</span>
                    </td>
                    <td>
                        <button onClick={this.newSegment.bind(this, true)} >Before</button>
                    </td>
                    <td>
                        <button onClick={this.newSegment.bind(this, false)} >After</button>
                    </td>
                </tr>
            </table>
        );
    },
});

module.exports = R.Toolbar(C("segment"), SegmentTools);
