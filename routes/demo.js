var express = require('express');
var router = express.Router();

router.get('/demo', function (request, response, next) {
    response.setHeader('content-type', 'text/plain; charset=utf-8');
    response.end([
        "Hello!",
        "Open a console and try to connect to the event source:",
        "var source = new EventSource('/');",
        "source.addEventListener('mess-id', console.log.bind(console));",
        "",
        "Then add a custom event listener:",
        "source.addEventListener('foo', function (event) {",
        "  console.log('foo:', event.data);",
        "});",
        "",
        "And send it through the HTTP API (here is an HTTPie example):",
        "http post 'http://localhost:3000/source/MESSID' 'name:=\"foo\"' 'data:=\"Hello, World!\"'",
        "Where MESSID is the data received in the 'mess-id' event.",
        "",
        "Or broadcast it to every event sources:",
        "echo '{ \"event\": { \"name\": \"foo\", \"data\": \"Hello, entire World!\" } }' |http post 'http://localhost:3000/broadcast'",
        "",
        "You can restrict your broadcast to a list of mess ids by specifying a 'recipients' set:",
        "echo '{ \"recipients\": [\"MESSID\"], \"event\": { \"name\": \"foo\", \"data\": \"Hello, subset of the World!\" } }' |http post 'http://localhost:3000/broadcast'",
    ].join('\n'), 'utf8');
});

module.exports = router;
