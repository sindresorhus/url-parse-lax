# url-parse-lax

> Lax [`url.parse()`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost) with support for protocol-less URLs & IPs

## Install

```
$ npm install url-parse-lax
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
	href: 'https://sindresorhus.com/'
}
*/

urlParseLax('[2001:db8::]:8000');
/*
{
	protocol: null,
	slashes: true,
	auth: null,
	host: '[2001:db8::]:8000',
	port: '8000',
	hostname: '2001:db8::',
	hash: null,
	search: null,
	query: null,
	pathname: '/',
	path: '/',
	href: 'http://[2001:db8::]:8000/'
}
*/
```

And with the built-in `url.parse()`:

```js
import url from 'url';

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
	pathname: 'sindresorhus',
	path: 'sindresorhus',
	href: 'sindresorhus'
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

- [url-format-lax](https://github.com/sindresorhus/url-format-lax) - Lax `url.format()` that formats a hostname and port into IPv6-compatible socket form of `hostname:port`

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-url-parse-lax?utm_source=npm-url-parse-lax&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
