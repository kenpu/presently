var C = require('../constants');
var util = require('../util');

function New(o) {
    return {
        T: C("box"),
        children: [],           // nested boxes
        content: {},            // contents including:
                                // - markdown
                                // - images (for gallery)
                                // - audio
                                // - docker-ssh
                                // - code
        orient: C("vertical"),  // orientation
        css: {},                // CSS styling
    };
}

function Children(box, child) {
    return util.child(box, child, C("box"));
}

function Markdown(box, markdown) {
    if(markdown != null) {
        box.content.markdown = markdown;
    }
    return box.content.markdown;
}

module.exports = {
    New: New,
};
