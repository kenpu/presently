var assert = function(cond) {
    if(! cond) throw("Assertion failed"); 
}

module.exports = {
    assert: assert,

    getset: function (obj, prop, val) {
        if(prop in obj) {
            if(val != null) {
                obj[prop] = val;
            }
            return obj[prop];
        } else {
            throw("prop[" + prop + "] not found");
        }
    },

    children: function(obj, child, types) {
        if(child != null) {
            if(child.length != null) {
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
};
