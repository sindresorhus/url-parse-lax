import test from 'ava';
import fn from './';

test(t => {
	t.is(fn('sindresorhus.com').hostname, 'sindresorhus.com');
	t.is(fn('192.168.0.1:80').hostname, '192.168.0.1');
	t.is(fn('[2001:db8::]:80').hostname, '2001:db8::');
});
