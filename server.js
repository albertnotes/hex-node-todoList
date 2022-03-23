const http = require('http');

const requestListener = (req, res) => {
	const headers = {
		'Access-Control-Allow-Headers':
			'Content-Type, Authorization, Content-Length, X-Requested-With',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
		'Content-Type': 'application/json',
	};
	const splitRequest = (url, method = 'GET') =>
		req.url === url && req.method === method;

	if (splitRequest('/')) {
		res.writeHead(200, headers);
		res.write(
			JSON.stringify({
				status: 'SUCCESS',
				data: [],
			})
		);
		res.end();
		return;
	}
	res.writeHead(404, headers);
	res.write(
		JSON.stringify({
			status: 'ERROR',
			message: '查無此網站路由',
		})
	);
	res.end();
};

const server = http.createServer(requestListener);
server.listen(8000);
