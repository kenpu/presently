var C = require('../constants');
var util = require('../util');
var Box = require('./box');
var Assign = require('object-assign');
var R = require('../registry');

function New(o) {
    var o = Assign({}, o);
    var BoxModel = R.Model(C("box"));

    var segment = BoxModel.New();

    segment.T = C("segment");
    segment.orient = C("vertical");

    if(o.layout) {
        var box = BoxModel.New({markdown: true});
        segment.children.push(box);
    }

    return segment;
}

function Insert(section, anchor, before) {
    var segment = New({
        layout: true,
    });

    var i = section.children.indexOf(anchor);
    if(! before) {
        i += 1;
    }
    section.children.splice(i, 0, segment);
    return segment;
}

module.exports = function(store) {
    return R.Model("segment", Assign({}, Box(store), {
        New: New.bind(store),
        Insert: Insert.bind(store),
    }));
};
