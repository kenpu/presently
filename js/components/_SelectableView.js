var React = require('react');
var store = require('../store');

module.exports = {
    isSelected: function() {
        var model = this.props.model;
        var selection = store.state().selection;
        if(selection)
            return(selection.indexOf(model) >= 0);
        else
            return false;
    },
    isSelAncestor: function() {
        var model = this.props.model;
        var ancestors = store.state().selAncestors;
        if(ancestors) {
            return (ancestors.indexOf(model) >= 0);
        }
        return false;
    },
    selectMe: function() {
        var model = this.props.model;
        var ancestors = this.props.ancestors;
        var selection = store.state().selection;

        // assume singleton selection
        selection.length = 0;
        selection.push(model);
        store.state().selAncestors = ancestors;

        if(model.source != null) {
            // focus on the editor.
            // uses the trick of reseting val()
            // to make sure the cursor is always at the very
            // end.
            setTimeout(function() {
                var el = $("#source-editor");
                var src = $("#source-editor").val();
                el.focus().val("").val(src);
            }, 10);
        }
    },
    unselectMe: function() {
        store.state().selection.length = 0;
    },
    componentDidMount: function() {
        var el = React.findDOMNode(this.refs.element);
        var self = this;
        $(el).click(function(e) {
            e.stopPropagation();

            if(self.isSelected()) {
                self.unselectMe();
            } else {
                self.selectMe();
            }

            store.emitChange();
        });
    },
};
