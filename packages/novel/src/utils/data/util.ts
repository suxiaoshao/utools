export const DOC_ID = 'database';

/**
 * 将数据写入文件
 * */
export function writeToFile(buf: Uint8Array): void {
  utools.db.remove(DOC_ID);
  utools.db.postAttachment(DOC_ID, buf, 'text/json');
}

/**
 * 从文件中获取数据
 * */
export function getBuffer(): Uint8Array {
  const data = utools.db.getAttachment(DOC_ID);
  let buf: Uint8Array;
  if (data === null) {
    buf = new TextEncoder().encode('');
  } else {
    buf = data;
  }
  return buf;
}
