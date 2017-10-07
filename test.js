import test from 'ava';
import m from '.';

test('wrong input', t => {
	t.throws(() => m(5), 'Expected `url` to be of type `string`, got `number` instead.');
});

test('parse urls', t => {
	t.is(m('sindresorhus.com').hostname, 'sindresorhus.com');
	t.is(m('192.168.0.1:80').hostname, '192.168.0.1');
	t.is(m('[2001:db8::]:80').hostname, '2001:db8::');
});
