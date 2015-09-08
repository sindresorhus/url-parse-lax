'use strict';
var test = require('ava');
var fn = require('./');

test(function (t) {
	t.is(fn('sindresorhus.com').hostname, 'sindresorhus.com');
	t.is(fn('192.168.0.1:80').hostname, '192.168.0.1');
	t.is(fn('[2001:db8::]:80').hostname, '2001:db8::');
	t.end();
});
