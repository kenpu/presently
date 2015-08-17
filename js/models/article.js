var C = require("../constants");
var util = require('../util');

var getset = util.getset;
var assert = util.assert;

function New(o) {
    var article = {
        T: C("article"),    // type is tagged as article
        title: "",
        data: "",           // yaml
        children: [],       // array of sections
    };

    return article;
}

function Title(article, title) {
    return getset(article, "title", title);
}

function Children(article, child) {
    return util.children(article, child, C("section"));
}

module.exports = function(store) {
    return {
        New: New.bind(store),
        Title: Title.bind(store),
        Children: Children.bind(store),
    };
};
