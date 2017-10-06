'use strict';
const url = require('url');
const prependHttp = require('prepend-http');

module.exports = (x, opts) => {
	if (typeof x !== 'string') {
		throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof x}\` instead.`);
	}

	const withProtocol = prependHttp(x, opts);
	const parsed = url.parse(withProtocol);

	if (withProtocol !== x) {
		parsed.protocol = null;
	}

	return parsed;
};
