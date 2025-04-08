const shell = require('shelljs');
const upath = require('upath');

const destPath = upath.resolve(upath.dirname(__filename), '../dist');

// Remove the dist folder
shell.rm('-rf', 'dist');

// Remove the assets folder in dist
shell.rm('-rf', 'dist/assets');

// Remove the css folder in dist
shell.rm('-rf', 'dist/css');

// Remove the js folder in dist
shell.rm('-rf', 'dist/js');

