var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');
var util = require('../util');
var Styles = require('./styles');

var Bootstrap = require('react-bootstrap');
var NavDropdown = Bootstrap.NavDropdown;
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

function SetLayout(segment, layout) {
    store.emitChange({
        f: function() {
            segment.layout = layout;
        },
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

var SegmentTools = function(props) {
    var model = props.model;
    var parent = props.parent;
    var generic = R.Model(C("generic"));

    return (
        <NavDropdown title="Segment" key={props.key} >
            <MenuItem header>Set Layout</MenuItem>
            <MenuItem onSelect={SetLayout.bind(null, model, 'slide')} >
                <span style={Styles.editor.indented}>Slide (1000px)</span>
            </MenuItem>
            <MenuItem onSelect={SetLayout.bind(null, model, 'slide-narrow')} >
                <span style={Styles.editor.indented}>Slide (800x)</span>
            </MenuItem>
            <MenuItem onSelect={SetLayout.bind(null, model, 'page')} >
                <span style={Styles.editor.indented}>Page</span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem header>Move</MenuItem>
            <MenuItem onSelect={Move.bind(generic, parent, model, true)}>
                Move before
            </MenuItem>
            <MenuItem onSelect={Move.bind(generic, parent, model, false)}>
                Move after
            </MenuItem>
            <MenuItem divider />
            <MenuItem onSelect={Copy.bind(generic, model)}>
                <span style={Styles.editor.indented}>
                    Copy segment
                </span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem header>Remove</MenuItem>
            <MenuItem onSelect={Remove.bind(generic, parent, model)}>
                <span style={Styles.editor.indented}>
                    Delete segment <b>!</b>
                </span>
            </MenuItem>
        </NavDropdown>
    );
};

R.Toolbar(C("segment"), SegmentTools);

module.exports = SegmentTools;
