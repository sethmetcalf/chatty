var messages = [
	"Welcome to Mountaineer Chat",
	"You are probably a lonely individual"
];


var onRequest = function(req, res){
	console.log(req.method);
	res.writeHead(200, {
		'Connection': 'close',
		'Content-type': 'text/html',
		'Access-Control-Allow-Origin': '*'
	});
	if(req.method == 'GET'){
	res.end(JSON.stringify(messages));
	} else {
		if(req.method == 'POST'){
			var postData = '';
			req.on('data', function(chunk){
				postData += chunk.toString();
			});
			req.on('end', function() {
				console.log("Got POST data: " +postData);
				var postObject = JSON.parse(postData);
				console.log(postObject);
				messages.push(postObject);
			});
	}
	};
};


http = require('http');
var port = 11000;
http.createServer(onRequest).listen(11000);
console.log('listening on port: ' +port);
console.log(port);
