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

function Wrap(parent, model) {
    store.emitChange({
        f: this.Wrap.bind(null, parent, model),
        resetSelection: true,
        contentChange: true,
        history: true,
    });
}

function Copy(model) {
    store.emitChange({
        f: this.Copy.bind(null, model),
        resetSelection: false,
        contentChange: false,
    });
}

function Paste(model) {
    store.emitChange({
        f: this.Paste.bind(null, model),
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

var Tools = function(props) {
    var model = props.model;
    var parent = props.parent;
    var generic = R.Model(C("generic"));

    var pasteInto;
    if(store.state().copy) {
        if(generic.CanPasteInto(model)) {
            pasteInto = [
                <MenuItem onClick={Paste.bind(generic, model)}>
                    <span style={Styles.editor.indented}>
                        Paste
                    </span>
                </MenuItem>,
                <MenuItem onClick={PasteMove.bind(generic, model)}>
                    <span style={Styles.editor.indented}>
                        Paste move
                    </span>
                </MenuItem>
            ];
        } else {
            pasteInto = (
                <MenuItem disabled>
                    <span style={Styles.editor.indented}>
                        Incompatible paste
                    </span>
                </MenuItem>
            );
        }
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
            <MenuItem divider />
            <MenuItem header > Delete </MenuItem>
            <MenuItem onClick={Remove.bind(generic, parent, model)}>
                <span style={Styles.editor.indented}>
                    <b>Delete {model.T}</b>
                </span>
            </MenuItem>
        </DropdownButton>
    );
};

R.Toolbar(C("generic"), Tools);

module.exports = Tools;
