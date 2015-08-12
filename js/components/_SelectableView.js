var React = require('react');
var store = require('../store');

module.exports = {
    isSelected: function() {
        var selection = store.state().selection;
        var model = this.props.model;

        return(selection.indexOf(model) >= 0);
    },
    componentDidMount: function() {
        var model = this.props.model;
        var el = React.findDOMNode(this.refs.element);
        var self = this;
        $(el).click(function(e) {
            e.stopPropagation();

            var selection = store.state().selection;

            selection.length = 0;
            selection.push(model);

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

            store.emitChange();
        });
    },
};
