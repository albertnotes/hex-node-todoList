const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./errorHandle');
const ValidationError = require('./ValidationError');
const todos = [];

const requestListener = (req, res) => {
	const { url, method } = req;
	const headers = {
		'Access-Control-Allow-Headers':
			'Content-Type, Authorization, Content-Length, X-Requested-With',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
		'Content-Type': 'application/json',
	};
	let body = '';
	req.on('data', chunk => {
		body += chunk;
	});

	if (method === 'OPTIONS') {
		res.writeHead(200, headers);
		res.end();
		return;
	}
	if (url === '/todos' && method === 'GET') {
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
	if (url === '/todos' && method === 'POST') {
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

	if (url === '/todos' && method === 'DELETE') {
		todos.length = 0;
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
	if (url.startsWith('/todos/') && method === 'DELETE') {
		try {
			const id = url.split('/').pop();
			const idx = todos.findIndex(todo => todo.id === id);
			if (idx === -1) {
				throw new ValidationError('待辦事項不存在');
			}
			res.writeHead(200, headers);
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
		return;
	}
	if (url.startsWith('/todos/') && method === 'PATCH') {
		req.on('end', () => {
			try {
				const bodyObj = JSON.parse(body);
				const id = url.split('/').pop();
				const idx = todos.findIndex(todo => todo.id === id);
				if (
					Array.isArray(bodyObj) ||
					!Object.getOwnPropertyNames(bodyObj).includes('title')
				) {
					throw new ValidationError('資料結構錯誤');
				}
				if (idx === -1) {
					throw new ValidationError('待辦事項不存在');
				}
				todos[idx].title = bodyObj.title;
				res.writeHead(200, headers);
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
			p,
		})
	);
	res.end();
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
