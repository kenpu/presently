var React = require('react');
var store = require('./store');
var R = require('./registry');
var Editor = require('./components/Editor');
var mockArticle = require('./mock/article')(store);
var ArticleModel = require('./models/article')(store);

require('./models/image')(store);
require('./models/generic')(store);

require('./components/ArticleTools');
require('./components/Section');
require('./components/SectionTools');
require('./components/Segment');
require('./components/SegmentTools');
require('./components/Box');
require('./components/BoxTools');
require('./components/Markdown');
require('./components/Html');
require('./components/Image');
require('./components/GenericTools');
require('./components/Codewalk');
require('./components/Variant');


var article;

try {
    article = JSON.parse(window.Presently.articleJSON);
} catch(e) {
    console.debug("Parsing failed:", e.message);
}
if(! article) article = ArticleModel.New();

store.state({
    article: article,
    ui: {
        screenSplit: 0.6,
        zoom: null,
        preview: false,
    },
    history: [article],
});

var el = document.getElementById("editor");

var view = (
        <Editor store={store} />
);

React.render(view, el);

$('html').pasteImageReader(function(paste) {
    var data = paste.dataURL;
    var model = store.selected();
    if(data && model) {
        var Model = R.Model(model.T);
        if(Model && Model.ImagePaste) {
            store.emitChange({
                f: Model.ImagePaste.bind(null, model, data),
                contentChange: true,
                history: true,
            });
        }
    }
});
