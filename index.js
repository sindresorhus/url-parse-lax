'use strict';
const url = require('url');
const prependHttp = require('prepend-http');

module.exports = (input, options) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof input}\` instead.`);
	}

	const withProtocol = prependHttp(input, options);
	const parsed = url.parse(withProtocol);

	if (withProtocol !== input) {
		parsed.protocol = null;
	}

	return parsed;
};
