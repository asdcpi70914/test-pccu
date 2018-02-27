var http = require("http"); 
function requestHandler(req, res) {
  if (req.url === "/") {
    res.end("Welcome to the homepage!");
  } else if (req.url === "/about") {
    res.end("Welcome to the about page!");
  } else {
    res.end("Error! File not found.");
  } 
}
var server = http.createServer(requestHandler);
server.listen(3000);