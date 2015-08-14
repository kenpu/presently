var React = require('react');
var R = require('../registry');
var store = require('../store');

var ArticleTools = React.createClass({
    render: function() {
        return (
            <table className="prly-tools">
                <tr>
                    <td style={{border: 'none'}}>
                        <span>Add</span>
                    </td>
                    <td>
                        <button>Slide</button>
                    </td>
                    <td style={{borderRight: '4px solid #aaa'}}>
                        <button>Page</button>
                    </td>
                    <td>
                        <button>Segment w/ notes</button>
                    </td>
                    <td>
                        <button>Segment (wide)</button>
                    </td>
                </tr>
            </table>
        );
    },
});

module.exports = ArticleTools;
