var marked = require('marked');
var yaml = require('js-yaml');
var hl = require('highlight.js');

var assert = function(cond) {
    if(! cond) {
        console.trace("Assertion failure");
        throw("Assertion failed"); 
    }
}

marked.setOptions({
    highlight: function(code) {
        return hl.highlightAuto(code).value;
    },
    gfm: true,
    breaks: false,
    smartLists: true,
    smartypants: true,
});

function locate(node, model) {
    if(node.children) {
        for(var i in node.children) {
            var child = node.children[i];
            if(child == model) {
                return [child];
            } else {
                var branch = locate(child, model);
                if(branch) {
                    branch.unshift(child);
                    return branch;
                }
            }
        }
    }
    return null;
}

module.exports = {
    assert: assert,

    getset: function (obj, prop, val) {
        if(obj == null)
            return null;

        if(prop in obj) {
            if(val != null) {
                obj[prop] = val;
            }
            return obj[prop];
        } else {
            console.trace("prop not found");
            throw("prop[" + prop + "] not found");
        }
    },

    children: function(obj, child, types) {
        if(child != null) {
            if($.isArray(child)) {
                child.forEach(function(c) {
                    if(types != null)
                        assert(types.indexOf(c.T) >= 0);
                    obj.children.push(c);
                });
            } else {
                var c = child;
                if(types != null)
                    assert(types.indexOf(c.T) >= 0);
                obj.children.push(c);
            }
        }

        return obj.children;
    },
    uuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    },
    parseData: function(text) {
        var result;

        try {
            result = yaml.load(text) || {};
        } catch(e) {
            result = {};
        }

        return result;
    },
    parseSource: function(text) {
        var result = {
            source: "",
            properties: {},
            style: {},
        };

        if(! text) return result;

        if(! text.endsWith("\n"))
            text += "\n";

        if(text.startsWith('@')) {
            var start = 0;
            var end = text.indexOf('\n');
            while(text[start] == '@') {
                // remove the leading @
                var line = text.substring(start + 1, end).trim();
                var sep = line.indexOf(":");
                var isStyle = true;
                if(sep < 0) {
                    sep = line.indexOf("=");
                    isStyle = false;
                }

                var prop, val;
                if(sep < 0) {
                    prop = line;
                    val = true;
                } else {
                    prop = line.substring(0, sep);
                    val = line.substring(sep+1);
                    val = val.trim();
                }
                prop = prop.trim();
                if(isStyle)
                    result.style[prop] = val;
                else
                    result.properties[prop] = val;

                start = end+1;
                end = text.indexOf("\n", start);
            }
            result.source = text.substring(start);

        } else {
            result.source = text;
        }

        return result;
    },

    md2html: function(md) {
        return marked(md);
    },

    locate: locate,

    nop: function() {
    },
};
