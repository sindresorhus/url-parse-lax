import test from 'ava';
import urlParseLax from '.';

test('wrong input', t => {
	t.throws(() => {
		urlParseLax(5);
	}, 'Expected `url` to be of type `string`, got `number` instead.');
});

test('parse urls', t => {
	t.is(urlParseLax('sindresorhus.com').hostname, 'sindresorhus.com');
	t.is(urlParseLax('192.168.0.1:80').hostname, '192.168.0.1');
	t.is(urlParseLax('[2001:db8::]:80').hostname, '2001:db8::');
	t.true(urlParseLax('sindresorhus.com').href.startsWith('https://'));
	t.true(urlParseLax('sindresorhus.com', {https: false}).href.startsWith('http://'));
});
