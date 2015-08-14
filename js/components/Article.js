var React = require('react');
var Section = require('./Section');
var _ActiveView = require('./_ActiveView');

var Article = React.createClass({
    mixins: [_ActiveView],
    render: function() {
        var article = this.props.model;

        var bodyStyle = {
            width: "100%",
        };

        var articleBody = [];
        article.children.forEach(function(section, i) {
            articleBody.push(
                <Section key={i} model={section} label={i+1} />
            );
        });

        return (
            <div>
                <div className="prly-article-header">
                    <h1 className="prly-article-title">
                        {article.title}
                    </h1>
                    <h2 className="prly-article-authors">
                        {article.authors}
                    </h2>
                </div>

                <div className="prly-article-body" style={bodyStyle}>
                    {articleBody}
                </div>
            </div>
        );
    }
});

module.exports = Article;
