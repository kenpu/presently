var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');
var util = require('../util');

var Bootstrap = require('react-bootstrap');
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

function split(box, orient) {
    var Box = R.Model(C("box"));
    if(box) {
        Box.Split(box, orient);
        store.emitChange();
    }
}

function extend(parent, box, before) {
    var Box = R.Model(C("box"));
    if(parent && box) {
        Box.Extend(parent, box, before);
        store.emitChange({
            resetSelection: true,
        });
    }
}

function rotate() {
}

function remove(parent, box) {
    if(parent && box) {
        var i = parent.children.indexOf(box);
        if(i >= 0) {
            parent.children.splice(i, 1);
            store.emitChange();
        }
    }
}

function unwrap(parent, box) {
    if(parent && box) {
        var i = parent.children.indexOf(box);
        if(i >= 0) {
            var args = [i, 1];
            box.children.forEach(function(x) { args.push(x); });
            parent.children.splice.apply(parent.children, args);
            store.emitChange();
        }
    }
}

var BoxTools = function(props) {
    var box = props.model;
    var parent = props.parent;

    return (
        <DropdownButton title="Box" key={props.key} onSelect={util.nop}>
            <MenuItem header> Structure </MenuItem>
            <MenuItem onClick={split.bind(null, box, C("vertical"))}>
                Split horizontal
            </MenuItem>
            <MenuItem onClick={split.bind(null, box, C("horizontal"))}>
                Split vertical
            </MenuItem>
            <MenuItem header> Extend </MenuItem>
            <MenuItem onClick={extend.bind(null, parent, box, true)}>
                Extend before
            </MenuItem>
            <MenuItem onClick={extend.bind(null, parent, box)}>
                Extend after
            </MenuItem>
            <MenuItem header> Remove </MenuItem>
            <MenuItem onClick={unwrap.bind(null, parent, box)}>
                Unwrap
            </MenuItem>
            <MenuItem onClick={remove.bind(null, parent, box)}>
                Delete <b>!</b>
            </MenuItem>

        </DropdownButton>
    );
};

R.Toolbar(C("box"), BoxTools);

module.exports = BoxTools;
