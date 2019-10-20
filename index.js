var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var test;
module.exports.request = function(){
    let req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            test = this.responseText;
            post();
        };
    };
req.open("GET", 'http:\/\/localhost:3000', true);
req.send();
}

function post(){
    let req = new XMLHttpRequest();
    req.open("POST", 'http:\/\/localhost:3000', true);
    req.send();
}
