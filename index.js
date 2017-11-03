'use strict';
const url = require('url');
const prependHttp = require('prepend-http');

module.exports = (input, options) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof input}\` instead.`);
	}

	return url.parse(prependHttp(input, options));
};
