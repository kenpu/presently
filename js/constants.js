var keymirror = require('keymirror');





var constants = {
    article: null,
    section: null,
    segment: null,
    box: null,
    markdown: null,
    html: null,
    codewalk: null,

    vertical: null,
    horizontal: null,
};










var mirror = keymirror(constants);
module.exports = function(name) {
    var val = mirror[name];
    if(val == null) {
        throw("Constant not defined here:" + name);
    }
    return val;
};
