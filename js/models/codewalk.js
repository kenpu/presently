var util = require('../util');
var C = require('../constants');
var R = require('../registry');

function New(o) {
    return {
        T: C("codewalk"),
        source: "",
    }
}

var SidenoteRE_pat = "^\s*/\\*={4,}\n((?:.|[\r\n])*?)^\s*={4,}\\*/\n";
var SidenoteRE = new RegExp(SidenoteRE_pat, "m");
var SidenoteRE_g = new RegExp(SidenoteRE_pat, 'mg');

// removes the indentation of the source.
var indentRE = "^\s+";
function dedent(src) {
    return src;
    /* TODO
    src = src.replace(/\t/g, "    ");
    var m;
    var indent = -1;

    do {
        m = indentRE.exc(src);
        if(index < m[0].length) index = m[0].length;
    } while(m);

    // now build a replacement re
    // and apply it to the source
    var re = ...
    src.replace(re, "")
    */
}

// extract the first partition
// returns
// {
//      first: {
//          sidenote: TEXT,
//          source: TEXT,
//      }
//      rest: TEXT
// }
function partitionOnce(source) {
    // find the first occurrence of sidenote
    var m = SidenoteRE.exec(source);
    var result;

    if(m == null) {
        // there is no sidenote anywhere
        result = {
            first: {
                sidenote: "",
                source: source,
            },
            rest: null,
        };
    } else {
        if(m.index == 0) {
            // this section starts with a sidenote
            source = source.substr(m.index + m[0].length);
            var m2 = SidenoteRE.exec(source);

            if(m2 == null) {
                // no more sidenotes
                result = {
                    first: {
                        sidenote: dedent(m[1]),
                        source: source,
                    },
                    rest: null,
                };
            } else {
                // more sidenotes to follow this section
                result = {
                    first: {
                        sidenote: dedent(m[1]),
                        source: source.substr(0, m2.index),
                    },
                    rest: source.substr(m2.index),
                };
            }
        } else {
            // this section does not start with a sidenote
            result = {
                first: {
                    sidenote: "",
                    source: source.substr(0, m.index),
                },
                rest: source.substr(m.index),
            };
        }
    }

    return result;
}

function partition(src) {
    // return value
    // [ { sidenote: TEXT,
    //     source: TEXT,
    //   } ]
    var parts = [];
    while(src) {
        var result = partitionOnce(src);
        parts.push(result.first);
        src = result.rest;
    }

    return parts;
}

function Parse(model) {
    var result = util.parseSource(model.source);
    result.parts = partition(result.source);

    if(result.parts.length == 1 && result.parts[0].sidenote == "") {
        result.hasSidenotes = false;
    } else {
        result.hasSidenotes = (result.parts.length > 0);
    }

    return result;
}

module.exports = function(store) {
    return R.Model(C("codewalk"), {
        New: New.bind(store),
        Parse: Parse,
    });
}
