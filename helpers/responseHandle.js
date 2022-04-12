const { HEADERS } = require('./constant');

const success = (res, code, data = undefined) => {
	res.writeHead(code, HEADERS);
	if (data) {
		res.write(
			JSON.stringify({
				status: 'SUCCESS',
				data: data,
			})
		);
	}
	res.end();
};

const error = (res, code, message = undefined) => {
	res.writeHead(code, HEADERS);
	if (message) {
		res.write(
			JSON.stringify({
				status: 'ERROR',
				message: message,
			})
		);
	}
	res.end();
};

module.exports = {
	success: success,
	error: error,
};
