var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');
var util = require('../util');
var Styles = require('./styles');

var Bootstrap = require('react-bootstrap');
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

function Move(parent, model, before) {
    if(this.Move(parent, model, before)) {
        store.emitChange({
            resetSelection: true,
            contentChange: true,
        });
    }
}

function Remove(parent, model) {
    if(this.Remove(parent, model)) {
        store.emitChange({
            resetSelection: true,
            contentChange: true,
        });
    }
}

function ToggleLayout(segment) {
    if(segment.layout == "slide")
        segment.layout = "page";
    else {
        segment.layout = "slide";
    }
    store.emitChange({
        contentChange: true,
    });
}

function Copy(model) {
    this.Copy(model);
    store.emitChange({
        resetSelection: false,
        contentChange: false,
    });
}

var SegmentTools = function(props) {
    var model = props.model;
    var parent = props.parent;
    var generic = R.Model(C("generic"));

    return (
        <DropdownButton title="Segment" key={props.key} onSelect={util.nop} >
            <MenuItem header>Structure</MenuItem>
            <MenuItem onClick={ToggleLayout.bind(null, model)} >
                Toggle layout
            </MenuItem>
            <MenuItem header>Move</MenuItem>
            <MenuItem onClick={Move.bind(generic, parent, model, true)}>
                Move before
            </MenuItem>
            <MenuItem onClick={Move.bind(generic, parent, model, false)}>
                Move after
            </MenuItem>
            <MenuItem divider />
            <MenuItem header>Edit</MenuItem>
            <MenuItem onClick={Copy.bind(generic, model)}>
                <span style={Styles.editor.indented}>
                    Copy segment
                </span>
            </MenuItem>
            <MenuItem onClick={Remove.bind(generic, parent, model)}>
                <span style={Styles.editor.indented}>
                    Delete segment <b>!</b>
                </span>
            </MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("segment"), SegmentTools);

module.exports = SegmentTools;
