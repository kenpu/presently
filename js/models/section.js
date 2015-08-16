var C = require('../constants');
var util = require('../util');
var R = require('../registry');
var Assign = require('object-assign');

function New(o) {
    o = Assign({}, o);

    var section = {
        T: C("section"),
        title: "",
        prelude: "",
        children: [],       // array of segments
    };

    // TODO: should create modular plugin system
    // for layout

    if(o.layout) {
        var segment = R.Model(C("segment")).New();
        var box = R.Model(C("box")).New();
        var text = R.Model(C("markdown")).New();

        section.children.push(segment);
        segment.children.push(box);
        box.children.push(text);

        section.layout = o.layout;
    }

    return section;
}

function Children(section, child) {
    return util.children(section, child, C("segment"));
}

function Prelude(section, markdown) {
    return util.getset(section, "prelude", markdown);
}

function AppendAfter(before, after) {
    var store = this;
    var article = store.state().article;

    var i = article.children.indexOf(before);
    if(i >= 0 && after) {
        article.children.splice(i+1, 0, after);
    }
}

module.exports = function(store) {
    return R.Model("section", {
        New: New.bind(store),
        Children: Children.bind(store),
        Prelude: Prelude.bind(store),
        AppendAfter: AppendAfter.bind(store),
    });
}
