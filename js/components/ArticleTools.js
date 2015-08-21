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
            <MenuItem onClick={newSection.bind(null, true)}>Before</MenuItem>
            <MenuItem onClick={newSection.bind(null, false)}>After</MenuItem>
            <MenuItem header>Segment</MenuItem>
            <MenuItem onClick={newSegment.bind(null, 'slide')}>Slide</MenuItem>
            <MenuItem onClick={newSegment.bind(null, 'page')}>Page</MenuItem>


            <MenuItem header>Zoom</MenuItem>
            <MenuItem onClick={changeZoom.bind(null, 1)}>100%</MenuItem>
            <MenuItem onClick={changeZoom.bind(null, null)}>Default</MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("article"), ArticleTools);

module.exports = ArticleTools;
