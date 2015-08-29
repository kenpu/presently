var React = require('react');
var R = require('../registry');
var C = require('../constants');
var store = require('../store');
var Styles = require('./styles');
var util = require('../util');

var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;


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
            
var ArticleTools = function(props) {
    return (
        <DropdownButton title="Article" key={props.key} onSelect={util.nop} >
            <MenuItem header>Section</MenuItem>
            <MenuItem onClick={newSection.bind(null, true)}>
                <span style={Styles.editor.indented}>Before</span>
            </MenuItem>
            <MenuItem onClick={newSection.bind(null, false)}>
                <span style={Styles.editor.indented}>After</span>
            </MenuItem>
            <MenuItem divider />

            <MenuItem header>Segment</MenuItem>
            <MenuItem onClick={newSegment.bind(null, 'slide')}>
                <span style={Styles.editor.indented}>Slide</span>
            </MenuItem>
            <MenuItem onClick={newSegment.bind(null, 'page')}>
                <span style={Styles.editor.indented}>Page</span>
            </MenuItem>
            <MenuItem divider />


            <MenuItem header>Zoom</MenuItem>
            <MenuItem onClick={changeZoom.bind(null, 1)}>
                <span style={Styles.editor.indented}>100%</span>
            </MenuItem>
            <MenuItem onClick={changeZoom.bind(null, null)}>
                <span style={Styles.editor.indented}>
                    Default
                </span>
            </MenuItem>
            <MenuItem onClick={Read}>
                <span style={Styles.editor.indented}>
                    Read
                </span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem onClick={Undo}>
                Undo
            </MenuItem>
            <MenuItem onClick={Redo}>
                Redo
            </MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("article"), ArticleTools);

module.exports = ArticleTools;
