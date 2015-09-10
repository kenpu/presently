var React = require('react');
var Styles = require('./styles');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var Radium = require('radium');

var elements = null;
var current = null;

function article() {
    return $(".prly-article:first");
}

function hideAll() {
    var dfd = $.Deferred();
    $("[data-prly]").hide(0, function() {
        dfd.resolve();
    });
    return dfd;
}

function showAll() {
    $("[data-prly]").show();
}

function start() {
    elements = $('[data-prly="1"]');
    current = 0;
    article().addClass("prly-on");

    goto();
}

function stop() {
    elements = null;
    current = null;
    article().removeClass("prly-on");
    showAll();
}

function back() {
    if(! elements) {
        return
    }

    if(current > 0) {
        current -= 1;
        goto();
    }
}

function forward() {
    if(! elements) {
        return
    }

    if(current < elements.size()-1) {
        current += 1;
        goto();
    }
}

function goto() {
    var element = elements[current];

    if(element) {
        var dfd = hideAll();
        dfd.then(function() {
            resetSteps($(element));
            $(element).fadeIn();
            setProgress('prly-progress', current, elements.size());
        });
    }
}

// create the bindings
//
var PGUP = 33,
    PGDN = 34,
    LEFT = 37,
    RIGHT = 39,
    UP = 38,
    DN = 40;

var keys = {
    33: 1,
    34: 1,
    37: 1,
    38: 1,
    39: 1,
    40: 1,
};

$("html").bind("keydown", function(e) {
    if(elements == null) {
        return true;
    }
    var code = e.which;
    if(! keys[code]) {
        return true;
    }

    e.stopPropagation();
    e.preventDefault();

    switch(code) {
        case UP:
            back(); break;
        case DN:
            forward(); break;
        case LEFT:
            turnstep(-1); break;
        case RIGHT:
            turnstep(+1); break;
        case PGUP:
            turnstep(-1, true); break;
        case PGDN:
            turnstep(+1, true); break;
    }
});


/* ========== steps =========== */

function getSteps(el) {
    steps = $(".prly-step", el).filter(function(i, el) {
        return $(".prly-step", el).size() == 0;
    });
    return steps;
}

function indexOf(steps, selector) {
    var index = -1;
    steps.each(function(i, x) {
        if($(x).is(selector)) {
            index = i;
            return false;
        }
    });

    return index;
}

function resetSteps(el) {
    var steps = getSteps(el);
    steps.removeClass("before-focus in-focus after-focus");
    setProgress('prly-step-progress');
    if(steps.size() > 1)
        focus(steps, 0);
}

function turnstep(delta, overflow) {
    if(! elements) {
        return
    }

    function doOverflow() {
        if(overflow) {
            (delta < 0) ? back() : forward();
        }
    }

    var element = $(elements[current]);
    var steps = getSteps(element);
    // only do stepping if there are more than one step.
    if(steps.size() > 1) {
        var i = indexOf(steps, ".in-focus");
        i += delta;
        if(i >= 0 && i < steps.size())
            focus(steps, i);
        else {
            doOverflow();
        }
    } else {
        doOverflow();
    }
}

function focus(steps, i) {
    var n = steps.size();

    // clear all the classes
    steps.removeClass('before-focus after-focus in-focus');

    // add the proper classes
    steps.each(function(j, s) {
        if(j < i) {
            $(s).addClass('before-focus');
        } else if(j == i) {
            $(s).addClass('in-focus');
        } else if(j > i) {
            $(s).addClass('after-focus');
        }
    });

    setProgress('prly-step-progress', i, n);
}

function setProgress(id, i, n) {
    var p = 0;
    if(n > 1) {
        p = 1 * (i+1) / n;
    }
    p = (p * 100) + "%";
    $("#" + id).css({
        width: p,
    });
}

var PresentlyNav = React.createClass({
    render: function() {
        return (
            <div >
                <Navbar brand="Presently" fixedBottom className="prly-navbar">
                    <Nav>
                        <NavItem onClick={start}>Start</NavItem>
                        <NavItem onClick={stop}>Stop</NavItem>
                        <NavItem onClick={back}>Back</NavItem>
                        <NavItem onClick={forward}>Forward</NavItem>
                    </Nav>
                </Navbar>
                <div style={Styles.navbar.progressbar} className="prly-indicators">
                    <div style={[Styles.navbar.indicator, {background: 'blue'}]} 
                         id="prly-step-progress"/>
                    <div style={Styles.navbar.indicator} id="prly-progress"/>
                </div>
            </div>
        );
    },
});

module.exports = Radium(PresentlyNav);
