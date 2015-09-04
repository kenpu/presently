var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');
var util = require('../util');

var Bootstrap = require('react-bootstrap');
var NavDropdown = Bootstrap.NavDropdown;
var MenuItem = Bootstrap.MenuItem;

function split(box, orient) {
    var Box = R.Model(C("box"));
    if(box) {
        store.emitChange({
            f: Box.Split.bind(null, box, orient),
            resetSelection: true,
            contentChange: true,
            history: true,
        });
    }
}

function extend(parent, box, before) {
    var Box = R.Model(C("box"));
    if(parent && box) {
        store.emitChange({
            f: Box.Extend.bind(null, parent, box, before),
            resetSelection: true,
            contentChange: true,
            history: true,
        });
    }
}

function rotate(box) {
    store.emitChange({
        f: R.Model(C("box")).Rotate.bind(null, box),
        contentChange: true,
        history: true,
    });
}

function empty(parent, box) {
    store.emitChange({
        f: function() {
            box.children.length = 0;
        },
        resetSelection: true,
        contentChange: true,
        history: true,
    });
}

function unwrap(parent, box) {
    if(parent && box) {
        var i = parent.children.indexOf(box);
        if(i >= 0) {
            store.emitChange({
                f: function() {
                    var args = [i, 1];
                    box.children.forEach(function(x) { args.push(x); });
                    parent.children.splice.apply(parent.children, args);
                },
                resetSelection: true,
                contentChange: true,
                history: true,
            });
        }
    }
}

function add(box, T) {
    var Model = R.Model(T);
    if(Model && Model.New) {
        box.children.push(Model.New());
        store.emitChange({
            f: function() {
                box.children.push(Model.New());
            },
            contentChange: true,
            history: true,
        });
    }
};

var BoxTools = function(props) {
    var box = props.model;
    var parent = props.parent;

    var contents = ["markdown", "codewalk", "image", "box"];
    var addContent = contents.map(function(t) {
        return (
            <MenuItem onSelect={add.bind(null, box, C(t))}>{t}</MenuItem>
        );
    });

    return (
        <NavDropdown title="Box" key={props.key}>
            <MenuItem header> Add content </MenuItem>
            {addContent}
            <MenuItem header> Structure </MenuItem>
            <MenuItem onSelect={rotate.bind(null, box)} >
                Rotate
            </MenuItem>
            <MenuItem onSelect={split.bind(null, box, C("vertical"))}>
                Split horizontal
            </MenuItem>
            <MenuItem onSelect={split.bind(null, box, C("horizontal"))}>
                Split vertical
            </MenuItem>
            <MenuItem header> Extend </MenuItem>
            <MenuItem onSelect={extend.bind(null, parent, box, true)}>
                Extend before
            </MenuItem>
            <MenuItem onSelect={extend.bind(null, parent, box, false)}>
                Extend after
            </MenuItem>
            <MenuItem header> Remove </MenuItem>
            <MenuItem onSelect={unwrap.bind(null, parent, box)}>
                Unwrap
            </MenuItem>
            <MenuItem onSelect={empty.bind(null, parent, box)}>
                <b>Empty the box</b>
            </MenuItem>
        </NavDropdown>
    );
};

R.Toolbar(C("box"), BoxTools);

module.exports = BoxTools;
