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
            contentChange: true,
        });
    }
}

function extend(parent, box, before) {
    var Box = R.Model(C("box"));
    if(parent && box) {
        Box.Extend(parent, box, before);
        store.emitChange({
            resetSelection: true,
            contentChange: true,
        });
    }
}

function rotate(box) {
    R.Model(C("box")).Rotate(box);
    store.emitChange({
        contentChange: true,
    });
}

function empty(parent, box) {
    box.children.length = 0;
    store.emitChange({
        resetSelection: true,
        contentChange: true,
    });
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
                contentChange: true,
            });
        }
    }
}

function add(box, T) {
    var Model = R.Model(T);
    if(Model && Model.New) {
        box.children.push(Model.New());
        store.emitChange({
            contentChange: true,
        });
    }
};

var BoxTools = function(props) {
    var box = props.model;
    var parent = props.parent;

    var contents = ["markdown", "codewalk", "image", "box"];
    var addContent = contents.map(function(t) {
        return (
            <MenuItem onClick={add.bind(null, box, C(t))}>{t}</MenuItem>
        );
    });

    return (
        <DropdownButton title="Box" key={props.key} onSelect={util.nop}>
            <MenuItem header> Add content </MenuItem>
            {addContent}
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
            <MenuItem header> Remove </MenuItem>
            <MenuItem onClick={unwrap.bind(null, parent, box)}>
                Unwrap
            </MenuItem>
            <MenuItem onClick={empty.bind(null, parent, box)}>
                <b>Empty the box</b>
            </MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("box"), BoxTools);

module.exports = BoxTools;
