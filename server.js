const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./errorHandle');
const ValidationError = require('./ValidationError');
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
		return;
	}
	if (splitRequest('/todos')) {
		res.writeHead(200, headers);
		res.write(
			JSON.stringify({
				status: 'SUCCESS',
				data: todos,
			})
		);
		res.end();
		return;
	}
	if (splitRequest('/todos', 'POST')) {
		req.on('end', () => {
			try {
				const bodyObj = JSON.parse(body);
				if (
					Array.isArray(bodyObj) ||
					!Object.getOwnPropertyNames(bodyObj).includes('title')
				) {
					throw new ValidationError('資料結構錯誤');
				}
				const todo = {
					id: uuidv4(),
					title: bodyObj.title,
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
			} catch (error) {
				errorHandle(res, error);
			}
		});
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
server.listen(3005);
