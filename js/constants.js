var keymirror = require('keymirror');

var constants = {
    article: null,
};

var mirror = keymirror(constants);
module.exports = function(name) {
    var val = mirror[name];
    if(val == null) {
        throw("Constant not defined here:" + name);
    }
    return val;
};
