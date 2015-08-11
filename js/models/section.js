var C = require('../constants');
var util = require('../util');

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
    return {
        New: New.bind(store),
        Children: Children.bind(store),
        Prelude: Prelude.bind(store),
    };
}
