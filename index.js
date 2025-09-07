import prependHttp from 'prepend-http';

export default function urlParseLax(url, options) {
	if (typeof url !== 'string') {
		throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof url}\` instead.`);
	}

	// Handle URLs with authentication that prepend-http doesn't handle correctly
	const hasAuth = url.includes('@') && !url.includes('://');
	const colonIndex = url.indexOf(':');
	const atIndex = url.indexOf('@');
	const processedUrl = hasAuth && colonIndex !== -1 && colonIndex < atIndex
		? (options?.https === false ? 'http://' : 'https://') + url
		: prependHttp(url, options);

	const urlObject = new URL(processedUrl);

	// Create a result object that includes both old parse() and new URL properties
	return {
		protocol: urlObject.protocol,
		slashes: true,
		auth: (urlObject.username || urlObject.password) ? `${urlObject.username}:${urlObject.password}` : null,
		host: urlObject.host,
		port: urlObject.port || null,
		hostname: urlObject.hostname,
		hash: urlObject.hash || null,
		search: urlObject.search || null,
		query: urlObject.search ? urlObject.search.slice(1) : null,
		pathname: urlObject.pathname,
		path: urlObject.pathname + urlObject.search,
		href: urlObject.href,
		// Additional URL properties
		searchParams: urlObject.searchParams,
		origin: urlObject.origin,
		username: urlObject.username || null,
		password: urlObject.password || null,
	};
}
