const http = require('http');
const { v4: uuidv4 } = require('uuid');
const todos = [];

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

	let body = '';
	req.on('data', chunk => {
		body += chunk;
	});

	if (req.method === 'OPTIONS') {
		res.writeHead(200, headers);
		res.end();
	} else if (splitRequest('/todos')) {
		res.writeHead(200, headers);
		res.write(
			JSON.stringify({
				status: 'SUCCESS',
				data: todos,
			})
		);
		res.end();
	} else if (splitRequest('/todos', 'POST')) {
		req.on('end', () => {
			const title = JSON.parse(body).title;
			const todo = {
				id: uuidv4(),
				title: title,
			};
			todos.push(todo);
			res.writeHead(201, headers);
			res.write(
				JSON.stringify({
					status: 'SUCCESS',
					data: todos,
				})
			);
			res.end();
		});
	} else {
		res.writeHead(404, headers);
		res.write(
			JSON.stringify({
				status: 'ERROR',
				message: '查無此網站路由',
			})
		);
		res.end();
	}
};

const server = http.createServer(requestListener);
server.listen(3005);
