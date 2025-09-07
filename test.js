import {parse} from 'node:url'; // eslint-disable-line n/no-deprecated-api
import test from 'ava';
import urlParseLax from './index.js';

// Helper to extract url.parse() properties from both url.parse() result and our result
const extractUrlParseProperties = object => ({
	protocol: object.protocol,
	slashes: object.slashes,
	auth: object.auth,
	host: object.host,
	port: object.port,
	hostname: object.hostname,
	hash: object.hash,
	search: object.search,
	query: object.query,
	pathname: object.pathname,
	path: object.path,
	href: object.href,
});

test('wrong input', t => {
	t.throws(() => {
		urlParseLax(5);
	}, {
		message: 'Expected `url` to be of type `string`, got `number` instead.',
	});
});

test('parse URLs', t => {
	t.is(urlParseLax('sindresorhus.com').hostname, 'sindresorhus.com');
	t.is(urlParseLax('192.168.0.1:80').hostname, '192.168.0.1');
	t.is(urlParseLax('[2001:db8::]:80').hostname, '[2001:db8::]');
	t.true(urlParseLax('sindresorhus.com').href.startsWith('https://'));
	t.true(urlParseLax('sindresorhus.com', {https: false}).href.startsWith('http://'));
});

test('matches url.parse() output for simple URL', t => {
	const fullUrl = 'https://sindresorhus.com/';
	const expected = parse(fullUrl);
	const result = urlParseLax('sindresorhus.com');

	// Compare all url.parse() properties
	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);

	// Check additional URL properties exist
	t.truthy(result.searchParams);
	t.is(result.origin, 'https://sindresorhus.com');
	t.is(result.username, null);
	t.is(result.password, null);
});

test('matches url.parse() output for IPv6 URL', t => {
	const fullUrl = 'https://[2001:db8::]:8000/';
	const expected = parse(fullUrl);
	// Url.parse() removes brackets from IPv6 hostname, but URL keeps them
	expected.hostname = '[2001:db8::]';
	const result = urlParseLax('[2001:db8::]:8000');

	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);
});

test('matches url.parse() output for URL with port', t => {
	const fullUrl = 'https://sindresorhus.com:3000/';
	const expected = parse(fullUrl);
	const result = urlParseLax('sindresorhus.com:3000');

	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);
});

test('matches url.parse() output for URL with path', t => {
	const fullUrl = 'https://sindresorhus.com/foo/bar';
	const expected = parse(fullUrl);
	const result = urlParseLax('sindresorhus.com/foo/bar');

	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);
});

test('matches url.parse() output for URL with query string', t => {
	const fullUrl = 'https://sindresorhus.com/?foo=bar&baz=qux';
	const expected = parse(fullUrl);
	const result = urlParseLax('sindresorhus.com?foo=bar&baz=qux');

	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);

	// Check additional URL properties
	t.truthy(result.searchParams);
	t.is(result.searchParams.get('foo'), 'bar');
	t.is(result.searchParams.get('baz'), 'qux');
});

test('matches url.parse() output for URL with hash', t => {
	const fullUrl = 'https://sindresorhus.com/#section';
	const expected = parse(fullUrl);
	const result = urlParseLax('sindresorhus.com#section');

	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);
});

test('matches url.parse() output for URL with auth', t => {
	const fullUrl = 'https://user:pass@sindresorhus.com/';
	const expected = parse(fullUrl);
	const result = urlParseLax('user:pass@sindresorhus.com');

	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);

	// Check additional URL properties
	t.is(result.username, 'user');
	t.is(result.password, 'pass');
});

test('matches url.parse() output for complex URL', t => {
	const fullUrl = 'https://user:pass@sindresorhus.com:8080/foo/bar?baz=qux#section';
	const expected = parse(fullUrl);
	const result = urlParseLax('user:pass@sindresorhus.com:8080/foo/bar?baz=qux#section');

	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);

	// Check additional URL properties
	t.truthy(result.searchParams);
	t.is(result.searchParams.get('baz'), 'qux');
	t.is(result.origin, 'https://sindresorhus.com:8080');
	t.is(result.username, 'user');
	t.is(result.password, 'pass');
});

test('handles IPv4 addresses', t => {
	const fullUrl = 'https://192.168.0.1:8080/';
	const expected = parse(fullUrl);
	const result = urlParseLax('192.168.0.1:8080');

	t.deepEqual(
		extractUrlParseProperties(result),
		extractUrlParseProperties(expected),
	);
});

test('respects https option', t => {
	const httpResult = urlParseLax('sindresorhus.com', {https: false});
	const httpsResult = urlParseLax('sindresorhus.com', {https: true});
	const defaultResult = urlParseLax('sindresorhus.com');

	t.is(httpResult.protocol, 'http:');
	t.is(httpResult.href, 'http://sindresorhus.com/');
	t.is(httpResult.origin, 'http://sindresorhus.com');

	t.is(httpsResult.protocol, 'https:');
	t.is(httpsResult.href, 'https://sindresorhus.com/');
	t.is(httpsResult.origin, 'https://sindresorhus.com');

	t.is(defaultResult.protocol, 'https:');
	t.is(defaultResult.href, 'https://sindresorhus.com/');
});

test('handles edge cases', t => {
	// Email-like URL with auth but no password
	const emailLike = urlParseLax('user@example.com');
	t.is(emailLike.username, 'user');
	t.is(emailLike.password, null);
	t.is(emailLike.auth, 'user:');
	t.is(emailLike.hostname, 'example.com');

	// URL with multiple colons
	const multiColon = urlParseLax('user:pass:extra@example.com');
	t.is(multiColon.username, 'user');
	t.is(multiColon.hostname, 'example.com');

	// Localhost
	const localhost = urlParseLax('localhost:3000');
	t.is(localhost.hostname, 'localhost');
	t.is(localhost.port, '3000');

	// URL with only @ symbol (no auth)
	const justAt = urlParseLax('@example.com');
	t.is(justAt.username, null);
	t.is(justAt.password, null);
	t.is(justAt.hostname, 'example.com');
});
