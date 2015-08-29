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
    store.emitChange({
        f: this.Move.bind(null, parent, section, before),
        resetSelection: true,
        contentChange: true,
        history: true,
    });
}

function Remove(parent, section) {
    store.emitChange({
        f: this.Remove.bind(null, parent, section),
        resetSelection: true,
        contentChange: true,
        history: true,
    });
}

function PasteMove(model) {
    store.emitChange({
        f: this.PasteMove.bind(null, model),
        resetSelection: true,
        contentChange: true,
        history: true,
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
            <MenuItem divider />
            <MenuItem header>Delete</MenuItem>
            <MenuItem onClick={Remove.bind(generic, parent, section)}>
                Delete section <b>!</b>
            </MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("section"), SectionTools);

module.exports = SectionTools;
