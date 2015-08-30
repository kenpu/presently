var elements = null;
var current = null;

function article() {
    return $(".prly-article:first");
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
    if(current > 0) {
        current -= 1;
        goto();
    }
}

function forward() {
    if(current < elements.size()-1) {
        current += 1;
        goto();
    }
}

function goto() {
    var element = elements[current];

    if(element) {
        console.debug("showing element");
        var dfd = hideAll();
        dfd.then(function() {
            $(element).fadeIn();
        });
    }
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

module.exports = {
    start: start,
    stop: stop,
    back: back,
    forward: forward,
};
