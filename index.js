import {parse as parseUrl} from 'node:url';
import prependHttp from 'prepend-http';

export default function urlParseLax(url, options) {
	if (typeof url !== 'string') {
		throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof url}\` instead.`);
	}

	const finalUrl = prependHttp(url, options);
	return parseUrl(finalUrl);
}
