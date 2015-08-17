var React = require('react');
var R = require('../registry');
var C = require('../constants');
var store = require('../store');
var Styles = require('./styles');

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
    chgZoom: function(e) {
        var ui = store.state().ui;
        ui.zoom = e.target.value;
        console.debug("changing zoom to = ", ui.zoom);
        store.emitChange();
    },
    render: function() {
        return (
            <table className="prly-tools">
                <tr>
                    <th>Article Tools</th>
                    <td>
                        <button onClick={this.newSlide.bind(this, "slide")} >Slide</button>
                    </td>
                    <td>
                        <button onClick={this.newSlide.bind(this, "page")} >Page</button>
                    </td>
                    <th>View</th>
                    <td>
                        <select style={Styles.toolSelect} value={null} onChange={this.chgZoom}>
                            <option value={0}>Default</option>
                            <option value={1}>1.0</option>
                            <option value={1.2}>1.2</option>
                            <option value={1.5}>1.5</option>
                            <option value={2}>2.0</option>
                        </select>
                    </td>
                </tr>
            </table>
        );
    },
});

module.exports = ArticleTools;
