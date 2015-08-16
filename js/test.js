var React = require('react');
var CodeMirror = require('react-code-mirror');

var editor = (
    <CodeMirror
        readOnly
        value={"hello world"} />
);

React.render(editor, document.getElementById("code"));
