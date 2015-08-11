var C = require("../constants");
var util = require('../util');

var getset = util.getset;
var assert = util.assert;

function New(o) {
    var store = this;
    var article = {
        T: C("article"),    // type is tagged as article
        title: "",          // markdown
        prelude: "",        // markdown
        authors: "",        // yaml
        tags: "",           // yaml
        notes: "",          // yaml
        children: [],       // array of sections
    };

    // update the central store with the
    // new article.
    // state.article is a singleton.
    store.state().article = article;

    return article;
}

function Title(article, title) {
    return getset(article, "title", title);
}

function Prelude(article, prelude) {
    return getset(article, "prelude", title);
}

function Authors(article, authors) {
    return getset(article, "authors", authors);
}

function Tags(article, tags) {
    return getset(article, "tags", tags);
}

function Notes(article, notes) {
    return getset(article, "notes", notes);
}

function Children(article, child) {
    return util.children(article, child, C("section"));
}

module.exports = function(store) {
    return {
        New: New.bind(store),
        Title: Title.bind(store),
        Prelude: Prelude.bind(store),
        Children: Children.bind(store),
    };
};
