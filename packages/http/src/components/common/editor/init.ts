import 'monaco-editor/esm/vs/editor/editor.main';

self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new Worker('/tsWorker.js');
    if (label === 'json') return new Worker('./jsonWorker.js');
    if (label === 'css') return new Worker('./cssWorker.js');
    if (label === 'html') return new Worker('./htmlWorker.js');
    return new Worker('./editorWorker.js');
  },
};
