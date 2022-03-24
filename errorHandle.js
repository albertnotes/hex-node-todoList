const ValidationError = require('./ValidationError');

/**
 * 錯誤處理
 * - default
 * - ValidationError
 */
function errorHandle(res, error) {
	const headers = {
		'Access-Control-Allow-Headers':
			'Content-Type, Authorization, Content-Length, X-Requested-With',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
		'Content-Type': 'application/json',
	};

	/** custom error */
	if (error instanceof ValidationError) {
		res.writeHead(415, headers);
		res.write(
			JSON.stringify({
				status: 'ERROR',
				message: error.message,
			})
		);
		res.end();
		return;
	}
	res.writeHead(400, headers);
	res.write(
		JSON.stringify({
			status: 'ERROR',
			message: 'json parser error',
		})
	);
	res.end();
}

module.exports = errorHandle;
