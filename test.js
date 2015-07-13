'use strict';
var test = require('ava');
var fn = require('./');

test(function (t) {
	t.assert(fn('sindresorhus.com').hostname === 'sindresorhus.com');
	t.assert(fn('192.168.0.1:80').hostname === '192.168.0.1');
	t.assert(fn('[2001:db8::]:80').hostname === '2001:db8::');
	t.end();
});
