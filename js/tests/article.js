var Article = require("../models/article");
var a1 = Article.New();

Article.Title(a1, "Hello");
console.log(a1);
console.log("Title =", Article.Title(a1), "=", a1.title);
