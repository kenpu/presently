var React = require('react');
var store = require('./store');
var Editor = require('./components/Editor');
var mockArticle = require('./mock/article')(store);

require('./components/Segment');
require('./components/SegmentTools');
require('./components/Box');
require('./components/BoxTools');
require('./components/Markdown');
require('./components/Html');
require('./components/Codewalk');
require('./components/Variant');

// Normally, we would need to load the article data
// from the server, followed by a store.emitChange()
store.state({
    article: mockArticle,
    ui: {
        screenSplit: 0.6,
        zoom: 1,
        preview: false,
    },
});

var el = document.getElementById("editor");

var view = (
        <Editor store={store} />
);

React.render(view, el);
