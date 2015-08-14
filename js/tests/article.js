var store = require('../store');
var R = require('../registry');
var C = require('../constants');
var article = require('../mock/article')(store);

console.log(JSON.stringify(article, null, 2));

var segment = article.children[0].children[0];
var box = segment.children[0];

console.log("Box model", R.Model(box.T));

markdowns = R.Model(box.T).Find(box, C("markdown"));

console.log("Find markdowns", markdowns);

var md = markdowns[0];

console.log("Sidenotes:", R.Model(md.T).Sidenotes(md));

