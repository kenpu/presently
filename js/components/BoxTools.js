var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');

var BoxTools = React.createClass({
    split: function(orient) {
        var model = this.props.model;
        var BoxModel = R.Model(C("box"));
        BoxModel.Split(model, orient);
        store.emitChange();
    },
    rotate: function() {
        var model = this.props.model;
        var newOrient = (model.orient == C("horizontal")) ? C("vertical") : C("horizontal");
        model.orient = newOrient;
        store.emitChange();
    },
    extend: function(before) {
        var model = this.props.model;
        var parent = this.props.parent;

        if(parent && parent.T == C("box")) {
            R.Model(C("box")).Extend(parent, model, before);
            store.emitChange();
        }
    },
    render: function() {
        return (
            <table className="prly-tools">
                <tr>
                    <th>Box</th>
                    <td><button onClick={this.split.bind(this, C("horizontal"))}>Splt Vert</button></td>
                    <td><button onClick={this.split.bind(this, C("vertical"))}>Splt Horiz</button></td>
                    <td><button onClick={this.rotate}>Rotate</button></td>
                    <td><button onClick={this.extend.bind(this, true)}>+Before</button></td>
                    <td><button onClick={this.extend.bind(this, false)}>+After</button></td>
                </tr>
                <tr>
                    <th>Edit</th>
                    <td><button>Unwrap</button></td>
                    <td><button>Empty</button></td>
                    <td><button>Delete</button></td>
                    <td></td>
                    <td><button>Copy</button></td>
                </tr>
                <tr>
                    <th>Content</th>
                    <td><button>Add</button></td>
                    <td><button>Image</button></td>
                </tr>
            </table>
        );
    },
});

R.Toolbar(C("box"), BoxTools);

module.exports = BoxTools;
