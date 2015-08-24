var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');
var util = require('../util');
var Styles = require('./styles');

var Bootstrap = require('react-bootstrap');
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

function Move(parent, section, before) {
    if(this.Move(parent, section, before)) {
        store.emitChange({
            resetSelection: true,
            contentChange: true,
        });
    }
}

function Remove(parent, section) {
    if(this.Remove(parent, section)) {
        store.emitChange({
            resetSelection: true,
            contentChange: true,
        });
    }
}

function PasteMove(model) {
    this.PasteMove(model);
    store.emitChange({
        resetSelection: true,
        contentChange: true,
    });
}

var SectionTools = function(props) {
    var section = props.model;
    var parent = props.parent;
    var generic = R.Model(C("generic"));

    var pasteInto;
    if(store.state().copy && generic.CanPasteInto(section)) {
        pasteInto = (
            <MenuItem onClick={PasteMove.bind(generic, section)} >
                <span style={Styles.editor.indented}>
                    Paste move
                </span>
            </MenuItem>
        );
    }

    return (
        <DropdownButton title="Section" key={props.key} onSelect={util.nop} >
            {pasteInto}

            <MenuItem header>Move</MenuItem>
            <MenuItem onClick={Move.bind(generic, parent, section, true)}>
                Move before
            </MenuItem>
            <MenuItem onClick={Move.bind(generic, parent, section, false)}>
                Move after
            </MenuItem>
            <MenuItem header>Delete</MenuItem>
            <MenuItem onClick={Remove.bind(generic, parent, section)}>
                Delete section <b>!</b>
            </MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("section"), SectionTools);

module.exports = SectionTools;
