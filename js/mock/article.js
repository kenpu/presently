var Article = require('../models/article');
var Section = require('../models/section');
var Segment = require('../models/segment');
var Box = require('../models/box');
var Markdown = require('../models/markdown');
var Html = require('../models/html');
var Codewalk = require('../models/codewalk');
var Variant = require('../models/variant');
var C = require('../constants');


module.exports = function(store) {
    Article = Article(store);
    Section = Section(store);
    Segment = Segment(store);
    Box = Box(store);
    Markdown = Markdown(store);
    Html = Html(store);
    Codewalk = Codewalk(store);
    Variant = Variant(store);

    var article = Article.New();
    var section = Section.New();

    Article.Title(article, "How to kill a mocking bird.");

    var segment = Segment.New();
    Section.Children(section, [segment]);

    var b1 = Box.New();
    var b11 = Box.New();
    var b12 = Box.New();

    Segment.Children(segment, b1);
    Box.Orient(b1, C("horizontal"))
    Box.Children(b1, [b11, b12]);

    var markdown = Markdown.New();
    var html = Html.New();

    Markdown.Source(markdown, 
            "# Markdown title\n\n- First\n- Second\n\n" +
            "## Subtitle here\n\n> Block quote\n{{ here\n" +
            "goes nothing\n\n" + 
            "- goes \n" + 
            "- nothing\n" + 
            "}}\n" +
            "<span class=sidenote>Blah blah</span>");
    Html.Source(html, "<ul><li>Hello</li><li>World</li></ul>");

    Box.Children(b11, [markdown, html]);
    Box.Children(b12, Codewalk.New());

    var b2 = Box.New();
    var b21 = Box.New();
    var b22 = Box.New();

    Segment.Children(segment, b2);
    Box.Children(b2, [b21, b22]);
    Box.Orient(b2, C("vertical"));

    Box.Children(b21, [Markdown.New({source: "One"})]);
    Box.Children(b22, [Markdown.New({source: "Two"})]);

    Article.Children(article, [section]);

    return article;
};
