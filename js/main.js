var React = require('react');
var store = require('./store');
var Article = require('./components/Article');
var article = require('./mock/article')(store);

var el = document.getElementById("article");

var view = (
    <Article model={article} store={store} />
);

React.render(view, el);
