var React = require('react');
var R = require('../registry');
var C = require('../constants');
var store = require('../store');
var Styles = require('./styles');
var util = require('../util');

var Bootstrap = require('react-bootstrap');
var ButtonToolbar = Bootstrap.ButtonToolbar;
var ButtonGroup = Bootstrap.ButtonGroup;
var Button = Bootstrap.Button;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var Shortcuts = React.createClass({
    render: function() {
        var createNew = (
            <ButtonGroup >
                <DropdownButton title="+Section" id="new-section" bsSize="xsmall">
                    <MenuItem onSelect={newSection.bind(null, true)}>Before</MenuItem>
                    <MenuItem onSelect={newSection.bind(null, false)}>After</MenuItem>
                </DropdownButton>
                <DropdownButton title="+Segment" id="new-segment" bsSize="xsmall">
                    <MenuItem onSelect={newSegment.bind(null, 'slide')}>
                        Slide (1000px)
                    </MenuItem>
                    <MenuItem onSelect={newSegment.bind(null, 'slide-narrow')}>
                        Slide (800px)
                    </MenuItem>
                    <MenuItem onSelect={newSegment.bind(null, 'page')}>
                        Page
                    </MenuItem>
                </DropdownButton>
            </ButtonGroup>
        );
        var undoRedo = (
            <ButtonGroup bsSize="xsmall">
                <Button bsStyle="warning" onClick={Undo}>Undo</Button>
                <Button bsStyle="info" onClick={Redo}>Redo</Button>
            </ButtonGroup>
        );
        var view = (
            <ButtonGroup bsSize="xsmall">
                <Button onClick={changeZoom.bind(null, 1)}>100%</Button>
                <Button onClick={changeZoom.bind(null, null)}>Default</Button>
                <Button onClick={Read}>Read</Button>
            </ButtonGroup>
        );

        return (
            <ButtonToolbar>
            {createNew}
            {undoRedo}
            {view}
            </ButtonToolbar>
        );
    },
});

function changeZoom(val) {
    var ui = store.state().ui;
    store.emitChange({
        f: function() {
            ui.zoom = val;
        },
    });
}

function newSection(before) {
    var Section = R.Model(C("section"));
    var anchor = store.selected(C("section"));

    store.emitChange({
        f: function() {
            Section.Extend(anchor, before);
        },
        contentChange: true,
        history: true,
    });

}

function newSegment(layout) {
    var Segment = R.Model(C("segment"));
    var section = store.selected(C("section"));
    var anchor = store.selected(C("segment"));

    store.emitChange({
        f: function() {
            Segment.Extend(section, anchor, {
                layout: layout,
            });
        },
        contentChange: true,
        history: true,
    });
}

function Read() {
    var readURL = "/read" + window.location.pathname;
    window.open(readURL);
}

function Undo() {
    store.emitChange({
        f: store.undo,
        resetSelection: true,
        contentChange: true,
    });
}

function Redo() {
    store.emitChange({
        f: store.redo,
        resetSelection: true,
        contentChange: true,
    });
}


module.exports = Shortcuts;
