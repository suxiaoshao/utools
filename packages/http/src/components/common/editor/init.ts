import 'monaco-editor/esm/vs/editor/editor.main';

const tsWorker = new Worker('./tsWorker.js');
const cssWorker = new Worker('./cssWorker.js');
const htmlWorker = new Worker('./htmlWorker.js');
const jsonWorker = new Worker('./jsonWorker.js');
const editorWorker = new Worker('./editorWorker.js');

self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return tsWorker;
    if (label === 'json') return jsonWorker;
    if (label === 'css') return cssWorker;
    if (label === 'html') return htmlWorker;
    return editorWorker;
  },
  createTrustedTypesPolicy(policyName, option) {
    return undefined;
  },
};
