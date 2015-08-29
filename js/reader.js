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
var Cover = require('./components/Header');


var article, cover;

try {
    article = JSON.parse(window.Presently.articleJSON);
} catch(e) {
    console.debug("Parsing article failed:", e.message);
}
try {
    cover = JSON.parse(window.Presently.coverJSON);
} catch(e) {
    console.debug("Parsing cover failed:", e.message);
}

store.state({
    article: article,
    modified: false,
});

var el = document.getElementById("article");

console.debug("model = ", article);
var view = (
    <div>
        <Cover model={cover} header />
        <Article model={article} />
        <Cover model={cover} />
    </div>
);

React.render(view, el);
