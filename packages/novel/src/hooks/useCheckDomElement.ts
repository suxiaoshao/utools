/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-11-09 18:32:45
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-09 18:32:50
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/hooks/useCheckDomElement.ts
 * @Description: 检查 DOM 元素是否存在
 */
import { useState, useEffect } from 'react';

type ElementSelector = () => Element | null;

function useCheckDomElement(selector: string | ElementSelector): Element | null {
  const [targetElement, setTargetElement] = useState<Element | null>(null);

  useEffect(() => {
    // 检查元素是否存在并设置元素状态的函数
    const getElement = typeof selector === 'string' ? () => document.querySelector(selector) : selector;

    // 检查元素是否存在
    const checkAndSetElement = () => {
      const el = getElement();
      if (el) {
        setTargetElement(el);
        return true; // 表示找到了元素
      }
      return false; // 表示没有找到元素
    };

    // 首次检查元素是否存在
    if (!checkAndSetElement()) {
      // 如果元素不存在，则设置定时器继续检查
      const intervalId = setInterval(() => {
        if (checkAndSetElement()) {
          clearInterval(intervalId); // 如果找到元素，则清除定时器
        }
      }, 500);

      // 定时器清理函数
      return () => clearInterval(intervalId);
    }
  }, [selector]); // 依赖项是 selector，如果它改变了，重新运行 effect

  return targetElement; // 返回找到的元素或者 null
}

export default useCheckDomElement;
