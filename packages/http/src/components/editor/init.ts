import 'monaco-editor/esm/vs/editor/editor.main';

self.MonacoEnvironment = {
  getWorkerUrl: function (_, label: string) {
    if (label === 'json') {
      return './json.worker.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    return './editor.worker.js';
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  createTrustedTypesPolicy: self.MonacoEnvironment?.createTrustedTypesPolicy,
};
