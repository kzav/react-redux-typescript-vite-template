// jQueryのnext()の代替
export const next = (element: Element, selector: string): Element | null => {
  let x = element.nextElementSibling;
  while (x) {
    if (x.matches(selector)) {
      return x; // 条件に一致する要素を返す
    }
    x = x.nextElementSibling; // 次の兄弟要素に進む
  }
  return null; // 一致する要素がない場合
}

// jQueryのhasClass()の代替
export const hasClass = (element: HTMLElement, className: string): boolean => {
  return element.classList.contains(className);
}

// jQueryのaddClass()の代替
export const addClass = (element: HTMLElement, className: string): void => {
  element.classList.add(className);
}

// jQueryのremoveClass()の代替
export const removeClass = (element: HTMLElement, className: string): void => {
  element.classList.remove(className);
}

// jQueryのslideToggle()の代替
export const slideToggle = (element: HTMLElement, duration: number = 400): void => {
  const isHidden = window.getComputedStyle(element).display === "none";

  if (isHidden) {
    // スライドダウン
    element.style.display = "block"; // 表示状態にする
    element.style.height = "0"; // 高さを0にする
    element.style.overflow = "hidden"; // コンテンツがはみ出さないようにする
    const targetHeight = element.scrollHeight; // 要素の自然な高さを取得
    element.style.transition = `height ${duration}ms`;

    requestAnimationFrame(() => {
      element.style.height = `${targetHeight}px`;
    });

    setTimeout(() => {
      element.style.height = "";
      element.style.overflow = "";
      element.style.transition = "";
    }, duration);
  } else {
    // スライドアップ
    const currentHeight = element.offsetHeight; // 現在の高さを取得
    element.style.height = `${currentHeight}px`; // 現在の高さをセット
    element.style.overflow = "hidden";
    element.style.transition = `height ${duration}ms`;

    requestAnimationFrame(() => {
      element.style.height = "0";
    });

    setTimeout(() => {
      element.style.display = "none";
      element.style.height = "";
      element.style.overflow = "";
      element.style.transition = "";
    }, duration);
  }
}
