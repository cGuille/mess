module.exports = createSourceMap();

var uuid = require('node-uuid');
var debug = require('debug')('mess:source');

function createSourceMap() {
    return Object.defineProperties({}, {
        count: {
            value: function SourceMap_count() {
                var count = 0;
                for (var property in this) {
                    if (this.hasOwnProperty(property)) {
                        ++count;
                    }
                }
                return count;
            },
        },
        status: {
            value: function SourceMap_status() {
                var count = this.count();
                return count + " source" + (count >= 2 ? 's' : '');
            },
        },
        add: {
            value: function SourceMap_add(source) {
                for (var i = 0; i < 10; ++i) {
                    var messId = uuid.v4();
                    if (!this[messId]) {
                        this[messId] = source;
                        debug('assigned mess-id "' + messId + '" (' + this.status() + ').');
                        return messId;
                    }
                }
                throw new Error('Could not assign mess-id to source after ' + i + ' tries.');
            },
        },
        get: {
            value: function SourceMap_get(messId) {
                return this[messId];
            },
        },
        remove: {
            value: function SourceMap_remove(messId) {
                delete this[messId];
                debug('deleted mess-id "' + messId + '" (' + this.status() + ').');
            },
        },
    });
}
