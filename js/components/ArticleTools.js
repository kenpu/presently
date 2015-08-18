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

var ArticleTools = function(props) {
    return (
        <DropdownButton title="Article" key={props.key} onSelect={util.nop} >
            <MenuItem header>Zoom</MenuItem>
            <MenuItem onClick={changeZoom.bind(null, 1)}>100%</MenuItem>
            <MenuItem onClick={changeZoom.bind(null, null)}>Default</MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("article"), ArticleTools);

module.exports = ArticleTools;
