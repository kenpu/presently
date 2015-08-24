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
    ui.zoom = val;
    store.emitChange();
}

function newSection(before) {
    var Section = R.Model(C("section"));
    var anchor = store.selected(C("section"));

    Section.Extend(anchor, before);
    store.emitChange({
        contentChange: true,
    });

}

function newSegment(layout) {
    var Segment = R.Model(C("segment"));
    var section = store.selected(C("section"));
    var anchor = store.selected(C("segment"));

    Segment.Extend(section, anchor, {
        layout: layout,
    });

    store.emitChange({
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
        </DropdownButton>
    );
};

R.Toolbar(C("article"), ArticleTools);

module.exports = ArticleTools;
