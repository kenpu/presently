var Assign = require('object-assign');
var C = require('../constants');
var R = require('../registry');
var util = require('../util');

function New(o) {
    o = Assign({}, o);
    return {
        T: C("image"),
        uuid: util.uuid(),
        src: o.data,
        data: "",
    }
}

function Cleanup(model) {
}

function ImagePaste(model, data) {
    model.src = data;
}

module.exports = function(store) {
    return R.Model(C("image"), {
        New: New.bind(store),
        Cleanup: Cleanup.bind(store),
        ImagePaste: ImagePaste,
    })
};
