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

var EditorTools = React.createClass({
    render: function() {
        var style = this.props.style || {};

        var selection = this.props.selection;

        var menus = [];
        menus.push(R.Toolbar(C("article"))({key: 101}));

        var selection = store.state().selection;
        var selected = store.selected();
        var parent = store.selectedParent();

        var section = store.selected(C("section"));
        if(section) {
            menus.push(R.Toolbar(C("section"))({
                key: 102,
                model: section,
                parent: selection[0], // HACK: we assume section comes after article
            }));
        }

        var segment = store.selected(C("segment"));
        if(segment) {
            menus.push(R.Toolbar(C("segment"))({
                key: 103,
                model: segment,
                parent: section, // HACK: we assume segment comes after section
            }));
        }

        if(selected && selected.T != C("article")) {
            var menu = R.Toolbar(selected.T);

            // if parent is a box, display the box menu as well
            if(parent && parent.T == C("box") && selected.T != C("box")) {
                menus.push(R.Toolbar(C("box"))({
                    key: 200,
                    model: parent,
                    parent: selection[selection.length-3],
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

        return (
            <div style={style}>
                <Navbar style={Styles.navbar}>
                    <Nav>
                        {menus}
                    </Nav>
                </Navbar>
            </div>
        );
    },
});

module.exports = EditorTools;
