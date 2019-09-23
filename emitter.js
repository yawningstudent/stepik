let EventEmitter = require("events").EventEmitter;

let manager = new EventEmitter();
manager.on("request", (request) => {
    request.data = 'data';
    manager.response = request;
});

module.exports.manager = manager
