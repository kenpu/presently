var C = require('../constants');
var util = require('../util');
var R = require('../registry');
var Assign = require('object-assign');

function New(o) {
    o = Assign({}, o);

    var section = {
        T: C("section"),
        data: "",
        children: [],       // array of segments
    };

    return section;
}

function Children(section, child) {
    return util.children(section, child, C("segment"));
}

function Extend(anchor, before) {
    var store = this;
    var article = store.state().article;
    var section = New();

    var i = article.children.indexOf(anchor);
    if(i < 0) {
        article.children.push(section);
    } else {
        if(! before) i = i + 1;
        article.children.splice(i, 0, section);
    }

    return section;
}

module.exports = function(store) {
    return R.Model("section", {
        New: New.bind(store),
        Children: Children.bind(store),
        Extend: Extend.bind(store),
    });
}
