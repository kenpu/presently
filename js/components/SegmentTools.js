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

function SplitSection(model) {
    var state = store.state();
    var branch = util.locate(state.article, model);
    var article = state.article;
    var section = branch[0];
    var segment = branch[1];

    if(section && section.T == C("section") && segment == model) {

        var iSec = article.children.indexOf(section);
        var iSeg = section.children.indexOf(segment);

        store.emitChange({
            f: function() {
                var newSection = R.Model(C("section")).New();
                var newChildren = section.children.splice(iSeg);
                newSection.children = newChildren;
                article.children.splice(iSec+1, 0, newSection);
            },
            resetSelection: true,
            contentChange: true,
        });
    }
}

function JoinSection(model) {
    var state = store.state();
    var branch = util.locate(state.article, model);
    var article = state.article;

    var section = branch[0];
    var segment = branch[1];
    if(section && section.T == C("section") && segment == model) {
        var iSec = article.children.indexOf(section);
        var iSeg = section.children.indexOf(segment);

        // join only on the first segment
        if(iSeg == 0 && iSec > 0) {
            store.emitChange({
                f: function() {
                    // merge section with the previous section
                    var prevSection = article.children[iSec - 1];
                    prevSection.children = prevSection.children.concat(
                        section.children);

                    // remove the section after merge
                    article.children.splice(iSec, 1);
                },
                resetSelection: true,
                contentChange: true,
            });
        }
    }
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
            <MenuItem onSelect={SplitSection.bind(generic, model)}>
                Split
            </MenuItem>
            <MenuItem onSelect={JoinSection.bind(generic, model)}>
                Join
            </MenuItem>
            <MenuItem header>Move</MenuItem>
            <MenuItem onSelect={Move.bind(generic, parent, model, true)}>
                <span style={Styles.editor.indented}>
                    Move before
                </span>
            </MenuItem>
            <MenuItem onSelect={Move.bind(generic, parent, model, false)}>
                <span style={Styles.editor.indented}>
                    Move after
                </span>
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
