var registry = {
    views: {
    },
    toolbars: {
    },
    models: {
    },
};

function getset(category, name, entry) {
    var table = registry[category];

    if(table == null) {
        throw("Category unknown");
    }
    
    if(entry == null) {
        var ent = table[name];
        if(ent == null)
            throw("Type in category does not exist:" + category + "." + name);

        return ent;
    } else {
        table[name] = entry;
        return entry;
    }
}

module.exports = {
    View: function(name, reactClass) {
        return getset("views", name, reactClass);
    },
    Toolbar: function(name, reactClass) {
        try {
            return getset("toolbars", name, reactClass);
        } catch(e) {
            return null;
        }
    },
    Model: function(name, model) {
        return getset("models", name, model);
    },
};
