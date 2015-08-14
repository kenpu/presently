var C = require('../constants');
var util = require('../util');
var R = require('../registry');

function New(o) {
    return {
        T: C("section"),
        title: "",
        prelude: "",
        children: [],       // array of segments
    };
}

function Children(section, child) {
    return util.children(section, child, C("segment"));
}

function Prelude(section, markdown) {
    return util.getset(section, "prelude", markdown);
}

module.exports = function(store) {
    return R.Model("section", {
        New: New.bind(store),
        Children: Children.bind(store),
        Prelude: Prelude.bind(store),
    });
}
