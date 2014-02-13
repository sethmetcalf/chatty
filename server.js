var messages = [
	{message: "Welcome to Mountaineer Chat"},
	{message: "You are probably a lonely individual"}
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
	} 
	if (req.method == 'POST'){
			var postData = '';
			req.on('data', function(chunk){
				postData += chunk.toString();
				console.log("Current messages array: ", messages);
			});
			req.on('end', function() {
				console.log("Got POST data: " +postData);
				var postObject = JSON.parse(postData);
				console.log(postObject);
				messages.push(postObject);
				res.end();
			});
	}
	if (req.method === 'OPTIONS') {
		res.writeHead(200, {
		'Connection': 'close',
		'Content-type': 'text/html',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Method': 'OPTIONS, GET, POST',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		});
		res.end("{}");
	}

};

http = require('http');
http.createServer(onRequest).listen(12200);
console.log('listening');

