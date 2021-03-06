
var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');
var util = require('../util');

var Bootstrap = require('react-bootstrap');
var NavDropdown = Bootstrap.NavDropdown;
var MenuItem = Bootstrap.MenuItem;

function Move(parent, model, before) {
    store.emitChange({
        f: this.Move.bind(null, parent, model, before),
        resetSelection: true,
        contentChange: true,
        history: true,
    });
}

function Remove(parent, model) {
    store.emitChange({
        f: this.Remove.bind(null, parent, model),
        resetSelection: true,
        contentChange: true,
        history: true,
    });
}

var Tools = function(props) {
    var model = props.model;
    var parent = props.parent;
    var generic = R.Model(C("generic"));

    return (
        <NavDropdown title="Image" key={props.key} >
            <MenuItem header>Move</MenuItem>
            <MenuItem onSelect={Move.bind(generic, parent, model, true)}>
                Move before
            </MenuItem>
            <MenuItem onSelect={Move.bind(generic, parent, model, false)}>
                Move after
            </MenuItem>
            <MenuItem header>Delete</MenuItem>
            <MenuItem onSelect={Remove.bind(generic, parent, model)}>
                Delete Image <b>!</b>
            </MenuItem>
        </NavDropdown>
    );
};

R.Toolbar(C("image"), Tools);

module.exports = Tools;
