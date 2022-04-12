class ValidationError extends Error {
	/**
	 * custom error
	 * @constructor {message: string, code: number}
	 *  */
	constructor(props) {
		super(props.message);
		this.code = props.code;
		this.name = 'ValidationError';
	}
}

module.exports = ValidationError;
