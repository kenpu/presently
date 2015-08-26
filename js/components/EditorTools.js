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
    save: function() {
        var article = store.state().article;
        var saveURL = window.Presently.saveURL;
        var state = store.state();

        state.modified = null;
        store.emitChange();

        $.ajax({
            url: saveURL,
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(article),
            success: function(reply) {
                if(reply.error) {
                    alert("Error: " + reply.error);
                } else {
                    state.modified = false;
                    store.emitChange();
                }
            },
            error: function(err) {
                alert("Error:" + err.responseText);
            },
        });
    },
    render: function() {
        var style = this.props.style || {};

        var selection = this.props.selection;

        var menus = [];
        menus.push(R.Toolbar(C("article"))({key: 101}));

        var state = store.state();
        var selection = state.selection;
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

        // display the last box menu
        var box, boxparent;
        for(var i=state.selection.length-1; i > 0; i--) {
            var m = state.selection[i],
                p = state.selection[i-1];
            if(m.T == C("box")) {
                box = m;
                boxparent = p;
                break;
            }
        }
        if(box && boxparent) {
            menus.push(R.Toolbar(C("box"))({
                key: 104,
                model: box,
                parent: boxparent,
            }));
        }

        if(selected 
                && selected.T != C("article") 
                && selected.T != C("segment")
                && selected.T != C("section")) {
            var menu = R.Toolbar(selected.T);

            // display the component menu
            if(menu) {
                menus.push(menu({
                    key: 300,
                    model: selected,
                    parent: store.selectedParent(),
                }));
            }

            if(parent) {
                menus.push(R.Toolbar(C("generic"))({
                    key: 500,
                    model: selected,
                    parent: parent,
                }));
            }

        }

        var saveStyle = {};
        var saveLabel;

        if(state.modified === true) {
            saveStyle.background = "rgba(100,0, 0, 0.2)";
            saveLabel = (<span className="glyphicon glyphicon-remove"/>);
        } else if(state.modified === false) {
            saveStyle.background = "rgba(0,100,0,0.2)",
            saveLabel = (<span className="glyphicon glyphicon-ok"/>);
        } else {
            saveStyle.background = "transparent";
            saveLabel = "Saving...";
        }

        return (
            <div style={style}>
                <Navbar style={Styles.navbar}>
                    <Nav navbar>
                        <MenuItem onClick={this.save} style={saveStyle} >{saveLabel}</MenuItem>
                        {menus}
                    </Nav>
                </Navbar>
            </div>
        );
    },
});

module.exports = EditorTools;
