var html = require('./html');
var Assign = require('object-assign');
var C = require('../constants');
var R = require('../registry');
var util = require('../util');

function New(o) {
    return Assign(html(this).New(o), {
        T: C("markdown"),
        uuid: util.uuid(),
    }, o);
}

var SidenoteRE_pat = "{{((?:.|[\r\n])*?)}}";
var SidenoteRE = new RegExp(SidenoteRE_pat);
var SidenoteRE_g = new RegExp(SidenoteRE_pat, 'g');

function Sidenotes(markdown) { 
    var src = markdown.source;
    var sidenotes = [];

    function parseForSidenote(src, i) {
        var m = SidenoteRE.exec(src);
        var result;

        if(m != null) {
            // sidenote is a markdown model
            var sidenote = {
                source: m[1],
                uuid: markdown.uuid,
                index: idx,
            };
            src = src.replace(SidenoteRE, "");
            result = {
                src: src,
                sidenote: sidenote,
            };
        }

        return result;
    }

    var idx = 0;
    while(true) {
        var result = parseForSidenote(src, idx);

        if(result) {
            src = result.src;
            sidenotes.push(result.sidenote);
        } else {
            break;
        }

        idx += 1;
    }

    return sidenotes;
}

function FormattedSource(markdown, o) {
    o = o || {};

    var md = markdown.source;

    // replace sidenotes with anchors
    if(o.sidenotes) {
        var index = 0;
        var replacer = function() {
            var html = "<span " + 
                       "class='prly-anchor-number' " + 
                       "markdown-uuid='" + markdown.uuid + "' " +
                       "index='" + index + "'>*</span>";
            index += 1;
            return html;
        };
        md = md.replace(SidenoteRE_g, replacer);
    }

    var source = util.md2html(md);

    return source;
}

module.exports = function(store) {
    return R.Model("markdown", Assign({}, html(store), {
        New: New.bind(store),
        Sidenotes: Sidenotes,
        FormattedSource: FormattedSource,
    }));
};
