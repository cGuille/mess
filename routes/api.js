var inspect = require('util').inspect;
var format = require('util').format;

var express = require('express');
var debug = require('debug')('mess:api');
var async = require('async');

var sources = require('../lib/source-map');
var router = express.Router();

router.post('/source/:messId', function (request, response, next) {
    var asyncMode = !request.query.async;
    var eventSource = sources.get(request.params.messId);
    if (!eventSource) {
        return next();
    }
    debug(format("sending event: '%s' to '%s'.", inspect(request.body), request.params.messId));
    eventSource.send(request.body, function () {
        debug(format("event sent to '%s'.", request.params.messId));
        if (!asyncMode) {
            response.end();
        }
    });
    if (asyncMode) {
        response.end();
    }
});

router.post('/broadcast', function (request, response, next) {
    var asyncMode = !request.query.async;
    var event = request.body.event;
    var recipients = request.body.recipients;

    if (!event) {
        var error = new Error('no event provided');
        error.status = 400;
        return next(error);
    }
    async.forEachOf(
        sources,
        function broadcastIterator(eventSource, messId, end) {
            if (recipients && recipients.indexOf(messId) === -1) {
                return end();
            }
            debug(format("sending event: '%s' to '%s'.", inspect(event), messId));
            var wrote = eventSource.send(event, function () {
                debug(format("event sent to '%s'.", messId));
                end();
            });
            if (!wrote) {
                end();
            }
        },
        function broadcastEnd() {
            if (!asyncMode) {
                response.end();
            }
        }
    );
    if (asyncMode) {
        response.end();
    }
});

module.exports = router;
