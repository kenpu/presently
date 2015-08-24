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

function Wrap(parent, model) {
    this.Wrap(parent, model);
    store.emitChange({
        resetSelection: true,
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

function Paste(model) {
    this.Paste(model);
    store.emitChange({
        resetSelection: true,
        contentChange: true,
    });
}

function Cut(parent, model) {
}

var Tools = function(props) {
    var model = props.model;
    var parent = props.parent;
    var generic = R.Model(C("generic"));

    var pasteInto;
    if(generic.CanPasteInto(model)) {
        pasteInto = (
            <MenuItem onClick={Paste.bind(generic, model)}>
                <span style={Styles.editor.indented}>
                    Paste
                </span>
            </MenuItem>
        );
    }
    return (
        <DropdownButton title="Element" key={props.key} onSelect={util.nop} >
            <MenuItem header>Editing</MenuItem>

            {pasteInto}
            <MenuItem onClick={Copy.bind(generic, model)}>
                <span style={Styles.editor.indented}>
                    Copy
                </span>
            </MenuItem>
            <MenuItem onClick={Cut.bind(generic, parent, model)}>
                <span style={Styles.editor.indented}>
                    Cut
                </span>
            </MenuItem>
            <MenuItem onClick={Remove.bind(generic, parent, model)}>
                <span style={Styles.editor.indented}>
                    <b>Delete {model.T}</b>
                </span>
            </MenuItem>
            <MenuItem divider />

            <MenuItem header>Move</MenuItem>
            <MenuItem onClick={Move.bind(generic, parent, model, true)}>
                <span style={Styles.editor.indented}>Move before</span>
            </MenuItem>
            <MenuItem onClick={Move.bind(generic, parent, model, false)}>
                <span style={Styles.editor.indented}>Move after</span>
            </MenuItem>
            <MenuItem divider />

            <MenuItem onClick={Wrap.bind(generic, parent, model)}>
                Wrap with a box
            </MenuItem>

        </DropdownButton>
    );
};

R.Toolbar(C("generic"), Tools);

module.exports = Tools;
