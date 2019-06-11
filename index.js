'use strict';
const url = require('url');
const prependHttp = require('prepend-http');

module.exports = (inputUrl, options) => {
	if (typeof inputUrl !== 'string') {
		throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof inputUrl}\` instead.`);
	}

	const finalUrl = prependHttp(inputUrl, options);
	return url.parse(finalUrl); // eslint-disable-line node/no-deprecated-api
};
