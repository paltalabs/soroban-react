const { JSDOM } = require('jsdom');
require('raf/polyfill');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');

global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = {
  userAgent: 'node.js',
};
