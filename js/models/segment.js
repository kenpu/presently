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

    return segment;
}

function Extend(section, anchor, o) {
    var o = Assign({}, o);
    var segment = New();

    if(! section) {
        section = R.Model(C("section")).Extend();
    }

    var i = section.children.indexOf(anchor);
    if(i < 0) {
        section.children.push(segment);
    } else {
        section.children.splice(i+1, 0, segment);
    }

    // perform layout
    if(o.layout) {
        segment.layout = o.layout;
        var box = R.Model(C("box")).New({markdown: true});
        segment.children.push(box);
    }

    return segment;
}

module.exports = function(store) {
    return R.Model("segment", Assign({}, Box(store), {
        New: New.bind(store),
        Extend: Extend.bind(store),
    }));
};
