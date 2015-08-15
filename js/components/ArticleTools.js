var React = require('react');
var R = require('../registry');
var C = require('../constants');
var store = require('../store');

var ArticleTools = React.createClass({
    newSlide: function(layout) {
        var Section = R.Model(C("section"));
        var article = store.state().article;
        var selectedSection = store.selected(C("section"));

        if(selectedSection == null) {
            selectedSection = article.children[article.children.length-1];
        }

        var section = Section.New({
            layout: layout,
        });

        Section.AppendAfter(selectedSection, section);

        store.emitChange();
    },
    render: function() {
        return (
            <table className="prly-tools">
                <tr>
                    <td style={{border: 'none'}}>
                        <span>New Section</span>
                    </td>
                    <td>
                        <button onClick={this.newSlide.bind(this, "slide")} >Slide</button>
                    </td>
                    <td>
                        <button onClick={this.newSlide.bind(this, "page")} >Page</button>
                    </td>
                </tr>
            </table>
        );
    },
});

module.exports = ArticleTools;
