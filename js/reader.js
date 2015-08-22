var React = require('react');
var store = require('./store');
var R = require('./registry');

require('./models/article')(store);
require('./models/box')(store);
require('./models/codewalk')(store);
require('./models/generic')(store);
require('./models/html')(store);
require('./models/image')(store);
require('./models/markdown')(store);
require('./models/section')(store);
require('./models/segment')(store);
require('./models/variant')(store);

require('./components/Section');
require('./components/Segment');
require('./components/Box');
require('./components/Markdown');
require('./components/Html');
require('./components/Image');
require('./components/Codewalk');
require('./components/Variant');
var Article = require('./components/Article');


var article;

try {
    article = JSON.parse(window.Presently.articleJSON);
} catch(e) {
    console.debug("Parsing failed:", e.message);
}

store.state({
    article: article,
    modified: false,
});

var el = document.getElementById("article");

var view = (
    <Article model={article} />
);

React.render(view, el);
