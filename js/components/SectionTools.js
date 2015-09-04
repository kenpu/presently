var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');
var util = require('../util');
var Styles = require('./styles');

var Bootstrap = require('react-bootstrap');
var NavDropdown = Bootstrap.NavDropdown;
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

function Paste(model, move) {
    var paste;
    if(move) {
        paste = this.PasteMove.bind(null, model);
    } else {
        paste = this.Paste.bind(null, model);
    }
    store.emitChange({
        f: paste,
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
        pasteInto = [
            <MenuItem onSelect={Paste.bind(generic, section, false)} key="paste">
                <span style={Styles.editor.indented}>
                    Paste copy
                </span>
            </MenuItem>,
            <MenuItem onSelect={Paste.bind(generic, section, true)} key="pastemove">
                <span style={Styles.editor.indented}>
                    Paste move
                </span>
            </MenuItem>
        ];
    }

    return (
        <NavDropdown title="Section" key={props.key} >
            {pasteInto}
            <MenuItem header>Move</MenuItem>
            <MenuItem onSelect={Move.bind(generic, parent, section, true)}>
                <span style={Styles.editor.indented}>
                    Move before
                </span>
            </MenuItem>
            <MenuItem onSelect={Move.bind(generic, parent, section, false)}>
                <span style={Styles.editor.indented}>
                    Move after
                </span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem header>Delete</MenuItem>
            <MenuItem onSelect={Remove.bind(generic, parent, section)}>
                <span style={Styles.editor.indented}>
                    Delete section <b>!</b>
                </span>
            </MenuItem>
        </NavDropdown>
    );
};

R.Toolbar(C("section"), SectionTools);

module.exports = SectionTools;
