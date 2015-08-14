var React = require('react');
var C = require('../constants');
var R = require('../registry');
var store = require('../store');

var BoxTools = React.createClass({
    render: function() {
        var noBorder = {
            border: 'none',
        }
        return (
            <table className="prly-tools">
                <tr>
                    <td style={noBorder} ><span>New</span></td>
                    <td><button>Vertical</button></td>
                    <td><button>Horizontal</button></td>
                </tr>
                <tr>
                    <td style={noBorder} />
                    <td><button>MD</button></td>
                    <td><button>HTML</button></td>
                    <td><button>Code</button></td>
                    <td><button>Image</button></td>
                </tr>
                <tr>
                    <td style={noBorder} ><span>Structure</span></td>
                    <td><button>Rotate</button></td>
                    <td><button>Add Wrap</button></td>
                    <td><button>Collapse</button></td>
                    <td><button>Collapse All</button></td>
               </tr>
               <tr>
                    <td style={noBorder} />
                    <td> <button>Copy</button> </td>
                    <td> <button>Delete</button> </td>
               </tr>
            </table>
        );
    },
});

R.Toolbar(C("box"), BoxTools);

module.exports = BoxTools;
