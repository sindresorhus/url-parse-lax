# url-parse-lax

> Lax URL parsing with support for protocol-less URLs and IPs

## Install

```sh
npm install url-parse-lax
```

## Usage

```js
import urlParseLax from 'url-parse-lax';

urlParseLax('sindresorhus.com');
/*
{
	protocol: 'https:',
	slashes: true,
	auth: null,
	host: 'sindresorhus.com',
	port: null,
	hostname: 'sindresorhus.com',
	hash: null,
	search: null,
	query: null,
	pathname: '/',
	path: '/',
	href: 'https://sindresorhus.com/',
	searchParams: URLSearchParams {},
	origin: 'https://sindresorhus.com',
	username: null,
	password: null
}
*/

urlParseLax('[2001:db8::]:8000');
/*
{
	protocol: 'https:',
	slashes: true,
	auth: null,
	host: '[2001:db8::]:8000',
	port: '8000',
	hostname: '[2001:db8::]',
	hash: null,
	search: null,
	query: null,
	pathname: '/',
	path: '/',
	href: 'https://[2001:db8::]:8000/',
	searchParams: URLSearchParams {},
	origin: 'https://[2001:db8::]:8000',
	username: null,
	password: null
}
*/
```

And with the built-in `url.parse()`:

```js
import url from 'node:url';

url.parse('sindresorhus.com');
/*
{
	protocol: null,
	slashes: null,
	auth: null,
	host: null,
	port: null,
	hostname: null,
	hash: null,
	search: null,
	query: null,
	pathname: 'sindresorhus.com',
	path: 'sindresorhus.com',
	href: 'sindresorhus.com'
}
*/

url.parse('[2001:db8::]:8000');
/*
{
	protocol: null,
	slashes: null,
	auth: null,
	host: null,
	port: null,
	hostname: null,
	hash: null,
	search: null,
	query: null,
	pathname: '[2001:db8::]:8000',
	path: '[2001:db8::]:8000',
	href: '[2001:db8::]:8000'
}
*/
```

## API

### urlParseLax(url, options?)

#### url

Type: `string`

The URL to parse.

#### options

Type: `object`

##### https

Type: `boolean`\
Default: `true`

Prepend `https://` instead of `http://` to protocol-less URLs.

## Related

- [url-format-lax](https://github.com/sindresorhus/url-format-lax) - Formats a hostname and port into IPv6-compatible socket form of `hostname:port`
