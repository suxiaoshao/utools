/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

window.nodeFs = fs;

window.nodePath = path;

window.nodeDirname = __dirname;
