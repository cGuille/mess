var express = require('express');
var EventSender = require('event-sender');

var sources = require('../lib/source-map');
var router = express.Router();

var NOT_ACCEPTABLE = 406

router.get('/', function (request, response, next) {
    if (request.get('accept') !== 'text/event-stream') {
        var error = new Error('You have reached an event source endpoint.');
        error.status = NOT_ACCEPTABLE;
        return next(error);
    }
    var eventSource = new EventSender(response);
    var messId = sources.add(eventSource);
    request.on('close', function () { sources.remove(messId); });
    eventSource.send({ name: 'mess-id', data: messId });
});

module.exports = router;
