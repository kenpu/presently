var Assign = require('object-assign');
var Styles = require('./styles');

var _DefaultView = {
    bordered: function(style) {
        return Assign(style, {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Styles.borderColor,
        });
    },
    borderHighlight: function(style) {
        return Assign(style, {
            borderColor: Styles.borderHLColor,
        });
    },
    bgHighlight: function(style) {
        return Assign(style, {
            background: Styles.bgHLColor,
        });
    },
    padded: function(style) {
        var ancestors = this.props.ancestors;
        var isFirst = this.props.isFirst;
        var parent = ancestors[ancestors.length-1];
        var orient = parent.orient;
        var ml, mr, mt, mb;
        if(orient == 'horizontal') {
            ml = (isFirst) ? 10 : 0;
            mr = mt = mb = 10;
        } else {
            mt = (isFirst) ? 10 : 0;
            mb = ml = mr = 10;
        }

        return Assign(style, {
           marginLeft: ml,
           marginRight: mr,
           marginTop: mt,
           marginBottom: mb,
        });
    },
    parent: function() {
        var anc = this.props.ancestors;
        return anc[anc.length - 1];
    },
    inHorizontal: function() {
        var p = this.parent();
        return (p && p.orient == "horizontal");
    },
};

module.exports = _DefaultView;
