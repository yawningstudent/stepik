const http = require("http");
let server = new http.Server();
server.listen(3000, "127.0.0.1");
server.on("request", (req, res)=>{
    console.log("Hello world!\n");
    res.writeHead(200);
    res.end();
});

module.exports.server = server
