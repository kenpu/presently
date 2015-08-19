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
        store.emitChange({
            resetSelection: true,
        });
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

function rotate(box) {
    R.Model(C("box")).Rotate(box);
    store.emitChange();
}

function remove(parent, box) {
    if(R(C("generic")).Remove(parent, box)) {
        store.emitChange({
            resetSelection: true,
        });
    }
}

function unwrap(parent, box) {
    if(parent && box) {
        var i = parent.children.indexOf(box);
        if(i >= 0) {
            var args = [i, 1];
            box.children.forEach(function(x) { args.push(x); });
            parent.children.splice.apply(parent.children, args);
            store.emitChange({
                resetSelection: true,
            });
        }
    }
}

function wrap(parent, box) {
    if(parent && box) {
        var i = parent.children.indexOf(box);
        if(i >= 0) {
            var wrapper = R.Model(C("box")).New();
            wrapper.children.push(box);
            parent.children.splice(i, 1, wrapper);
            store.emitChange({
                resetSelection: true,
            });
        }
    }
}

function move(parent, box, before) {
    if(R.Model(C("generic")).Move(parent, box, before)) {
        store.emitChange({
            resetSelection: false, // same parent
        });
    }
}

var BoxTools = function(props) {
    var box = props.model;
    var parent = props.parent;

    return (
        <DropdownButton title="Box" key={props.key} onSelect={util.nop}>
            <MenuItem header> Structure </MenuItem>
            <MenuItem onClick={rotate.bind(null, box)} >
                Rotate
            </MenuItem>
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
            <MenuItem onClick={extend.bind(null, parent, box, false)}>
                Extend after
            </MenuItem>
            <MenuItem onClick={wrap.bind(null, parent, box)}>
                Wrap around
            </MenuItem>
            <MenuItem header> Move </MenuItem>
            <MenuItem onClick={move.bind(null, parent, box, true)}>
                Before
            </MenuItem>
            <MenuItem onClick={move.bind(null, parent, box, false)}>
                After
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
