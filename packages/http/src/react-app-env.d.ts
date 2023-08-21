import 'utools-api-types';
import * as fs from 'fs';
import * as path from 'path';
import { Database } from 'sql.js';
import * as fetch from 'node-fetch';

declare global {
  interface Window {
    nodeFs: typeof fs;
    nodePath: typeof path;
    db: Database;
    nodeFetch: typeof fetch;
    nodeFormData: typeof import('form-data');
  }
}
