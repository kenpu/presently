var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');
var util = require('../util');

var Bootstrap = require('react-bootstrap');
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

function split(box, orient) {
    console.debug("split", box, orient);
    var Box = R.Model(C("box"));
    if(box) {
        Box.Split(box, orient);
    }
    store.emitChange();
}

function extend(before) {
}

function rotate() {
}

var BoxTools = function(props) {
    var box = props.model;
    return (
        <DropdownButton title="Box" key={props.key} onSelect={util.nop}>
            <MenuItem header>
                Structure
            </MenuItem>
            <MenuItem onClick={split.bind(null, box, C("vertical"))}>
                Split horizontal
            </MenuItem>
            <MenuItem onClick={split.bind(null, box, C("horizontal"))}>
                Split vertical
            </MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("box"), BoxTools);

module.exports = BoxTools;
