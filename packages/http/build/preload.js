/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const formData = require('form-data');

window.nodeFs = fs;

window.nodePath = path;

window.nodeDirname = __dirname;
window.nodeFetch = fetch;
window.NodeFormData = formData;
