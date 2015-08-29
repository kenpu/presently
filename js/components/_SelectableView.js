var React = require('react');
var store = require('../store');

module.exports = {
    isSelected: function(checkAll) {
        var model = this.props.model;
        return store.isSelected(model, checkAll);
    },
    selectMe: function() {
        var model = this.props.model;
        var ancestors = this.props.ancestors || [];
        var state = store.state();

        // assume singleton selection
        state.selection = ancestors.concat(model);

        // focus on the editor.
        // uses the trick of reseting val()
        // to make sure the cursor is always at the very
        // end.
        /*
        if(model.source != null) {
            setTimeout(function() {
                var el = $("#source-editor");
                var src = $("#source-editor").val();
                el.focus().val("").val(src);
            }, 10);
        }
        */
    },
    unselectMe: function() {
        store.state().selection.length = 0;
    },
    componentDidMount: function() {
        var el = React.findDOMNode(this.refs.element);
        var self = this;
        $(el).click(function(e) {
            if(! self.props.readOnly) {
                e.stopPropagation();

                store.emitChange({
                    f: function() {
                        if(self.isSelected()) {
                            self.unselectMe();
                        } else {
                            self.selectMe();
                        }
                    },
                });
            }
        });
    },
};
