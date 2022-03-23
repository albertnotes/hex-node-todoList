const http = require('http');

const requestListener = (req, res) => {
	const headers = {
		'Content-Type': 'text/plain',
	};
	const splitRequest = (url, method = 'GET') =>
		req.url === url && req.method === method;

	if (splitRequest('/')) {
		res.writeHead(200, headers);
		res.write('Index');
		res.end();
		return;
	}
	if (splitRequest('/', 'DELETE')) {
		res.writeHead(200, headers);
		res.write('Deleted.');
		res.end();
		return;
	}
	res.writeHead(404, headers);
	res.write('Not Found.');
	res.end();
};

const server = http.createServer(requestListener);
server.listen(8000);
