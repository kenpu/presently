var store = require('../store');
var article = require('../mock/article')(store);

console.log(JSON.stringify(article, null, 2));

