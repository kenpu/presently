var registry = {
    views: {
    },
    toolbars: {
    },
};

function getset(category, name, reactClass) {
    var table = registry[category];

    if(table == null) {
        throw("Category unknown");
    }
    
    if(reactClass == null) {
        // get the reactClass
        var c = table[name];
        if(c == null)
            throw("Name in category does not exist.");

        return c;
    } else {
        table[name] = c;
    }
}

module.exports = {
    View: function(name, reactClass) {
        return getset("views", name, reactClass);
    },
    Toolbars: function(name, reactClass) {
        return getset("toolbars", name, reactClass);
    },
};
