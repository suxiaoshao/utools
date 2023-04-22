import 'monaco-editor/esm/vs/editor/editor.main';

const JsonWorker = new Worker('./jsonWorker.js');
const CssWorker = new Worker('./cssWorker.js');
const HtmlWorker = new Worker('./htmlWorker.js');
const EditorWorker = new Worker('./editorWorker.js');
const TsWorker = new Worker('/tsWorker.js');
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return TsWorker;
    if (label === 'json') return JsonWorker;
    if (label === 'css') return CssWorker;
    if (label === 'html') return HtmlWorker;
    return EditorWorker;
  },
};
