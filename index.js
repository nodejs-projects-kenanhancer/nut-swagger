#!/usr/bin/env node
'use strict';

let basePath;
if (require.main === module && require.main.path.includes("/node_modules/")) {
    // this module was run directly from the command line as in node xxx.js
    basePath = './node_modules/nut-swagger/src';
} else {
    basePath = './src';
}

require('../nut-swagger/cli').default({ basePath });