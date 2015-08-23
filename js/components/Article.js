var React = require('react');
var Section = require('./Section');
var Styles = require('./styles');
var _ActiveView = require('./_ActiveView');
var _SelectableView = require('./_SelectableView');
var util = require('../util');
var Radium = require('radium');
var C = require('../constants');
var R = require('../registry');

var Article = React.createClass({
    mixins: [_ActiveView, _SelectableView],
    headerStyle: function() {
        if(this.props.editing) {
            if(this.isSelected()) {
                return {
                    color: '#ffa',
                }
            }
        }
    },
    render: function() {
        var article = this.props.model;
        var editing = this.props.editing;

        var bodyStyle = {
            width: "100%",
        };

        // parsing
        var result = util.parseData(article.data);
        var title = result.title || "MISSING TITLE";

        var articleBody = [];
        article.children.forEach(function(section, i) {
            articleBody.push(
                <Section key={i}
                         model={section} 
                         ancestor={[article]}
                         label={i+1} editing={editing} isFirst={i==0} />
            );
        });

        return (
            <div>
                <div ref="element" style={[Styles.article.header, this.headerStyle()]} >
                    <span>{title}</span>
                </div>

                <div className="prly-article-body" style={bodyStyle}>
                    {articleBody}
                </div>
            </div>
        );
    }
});

Article = Radium(Article);

R.View(C("article"), Article);

module.exports = Article;
