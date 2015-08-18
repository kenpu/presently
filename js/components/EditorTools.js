var React = require('react');
var Assign = require('object-assign');
var store = require('../store');
var R = require('../registry');
var C = require('../constants');
var util = require('../util');
var Styles = require('./styles');

var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem

function newSection(before) {
    var Section = R.Model(C("section"));
    var anchor = store.selected(C("section"));

    Section.Extend(anchor, before);
    store.emitChange();

}

function newSegment(layout) {
    var Segment = R.Model(C("segment"));
    var section = store.selected(C("section"));
    var anchor = store.selected(C("segment"));

    Segment.Extend(section, anchor, {
        layout: layout,
    });

    store.emitChange();
}

function newSegmentPage() {
}

var NewMenu = function(props) {
    return (
        <DropdownButton title="New" eventKey={1} key={props.key} onSelect={util.nop}>
                <MenuItem header>Section</MenuItem>
                <MenuItem onClick={newSection.bind(null, true)}>Before</MenuItem>
                <MenuItem onClick={newSection.bind(null, false)}>After</MenuItem>
                <MenuItem header>Segment</MenuItem>
                <MenuItem onClick={newSegment.bind(null, 'slide')}>Slide</MenuItem>
                <MenuItem onClick={newSegment.bind(null, 'page')}>Page</MenuItem>
        </DropdownButton>
    );
};

var EditorTools = React.createClass({
    render: function() {
        var style = this.props.style || {};

        var selection = this.props.selection;

        var menus = [];
        menus.push(NewMenu({key: 100}));
        menus.push(R.Toolbar(C("article"))({key: 101}));

        var selection = store.state().selection;
        var selected = store.selected();
        var parent = store.selectedParent();

        if(selected && selected.T != C("article")) {
            var menu = R.Toolbar(selected.T);

            // if parent is a box, display the box menu as well
            if(parent && parent.T == C("box") && selected.T != C("box")) {
                menus.push(R.Toolbar(C("box"))({
                    key: 200,
                    model: parent,
                    parent: selection[selection.length-2],
                }));
            }

            // display the component menu
            if(menu) {
                menus.push(menu({
                    key: 300,
                    model: selected,
                    parent: store.selectedParent(),
                }));
            }
        }


        var x = <DropdownButton title="A"></DropdownButton>;

        return (
            <div style={style}>
                <Navbar brand="Presently" style={Styles.navbar}>
                    <Nav>
                        {menus}
                    </Nav>
                </Navbar>
            </div>
        );
    },
});

module.exports = EditorTools;
