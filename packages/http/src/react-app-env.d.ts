/// <reference types="react-scripts" />
import 'utools-api-types';
import * as fs from 'fs';
import * as path from 'path';
import { Database } from 'sql.js';

declare global {
  interface Window {
    nodeFs: typeof fs;
    nodePath: typeof path;
    db: Database;
  }
}
