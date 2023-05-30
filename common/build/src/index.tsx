import { createPackage } from '@electron/asar';

export const createDistPackage = () => createPackage('dist', 'dist/app.asar');

export { default as httpConfig } from './config/http';
export { default as novelConfig } from './config/novel';
