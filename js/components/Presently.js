var React = require('react');
var Styles = require('./styles');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var Radium = require('radium');

var elements = null;
var steps;
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
    var progress = 1;

    if(elements.size() > 1) {
        progress = current / (elements.size()-1);
    }
    progress = (progress * 100) + "%";

    if(element) {
        console.debug("goto element");
        var dfd = hideAll();
        dfd.then(function() {
            $(element).fadeIn();
            $("#prly-progress").css({
                width: progress,
            });
        });
    }
}

// create the bindings
//
var PGUP = 33,
    PGDN = 34;

$("html").bind("keydown", function(e) {
    if(elements == null) {
        return true;
    }
    var code = e.which;
    if(code != PGUP && code != PGDN) {
        return true;
    }

    e.stopPropagation();
    e.preventDefault();

    switch(code) {
        case PGUP:
            back(); break;
        case PGDN:
            forward(); break;
    }
});

/* ============ disabled ========= 
function getSteps(el) {
    steps = $(".prly-panel", el).filter(function(i, x) {
        return $(".prly-panel", x).size() == 0;
    });
}

function stepBack() {
    if(! elements) {
        return
    }

    var element = $(elements[current]);
    getSteps(element);
    var i = indexOf(steps, ".in-focus");

    if(i > 0) {
        focus(steps, i-1);
    } else {
        focus(steps, 0);
    }
}

function stepForward() {
    if(! elements) {
        return
    }

    var element = $(elements[current]);
    getSteps(element);
    var i = indexOf(steps, ".in-focus");

    if(0 <= i && i < steps.size()-1) {
        focus(steps, i+1);
    }
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

function focus(steps, i) {
    var el = steps[i];
    $(".in-focus").removeClass("in-focus");
    steps.addClass("out-focus");
    $(el).removeClass("out-focus").addClass("in-focus");

    // change the indicator
    var progress = 1;
    if(steps.size() > 1) {
        progress = i / (steps.size() - 1);
    }
    progress = (progress * 100) + "%";

    $("#prly-progress").css({
        width: progress,
    });
}

=========================*/

var PresentlyNav = React.createClass({
    render: function() {
        return (
            <div style={Styles.navbar.panel}>
            <Navbar brand="Presently" inverse fixedBottom>
                <Nav>
                    <NavItem onClick={start}>Start</NavItem>
                    <NavItem onClick={stop}>Stop</NavItem>
                    <NavItem onClick={back}>Back</NavItem>
                    <NavItem onClick={forward}>Forward</NavItem>
                </Nav>
            </Navbar>
                <div style={Styles.navbar.progressbar}>
                    <div style={Styles.navbar.indicator} id="prly-progress"/>
                </div>
            </div>
        );
    },
});

module.exports = Radium(PresentlyNav);
