import { Action } from "@reduxjs/toolkit";

// 待機時非同期アクション
const isPendingAction = (action: Action): boolean => {
  return action.type.endsWith("pending");
}

// 失敗時非同期アクション
const isRejectedAction = (action: Action): boolean => {
  return action.type.endsWith("rejected");
}

// HTML埋め込み値取得
const htmlEmbeddedValue = (id: string): string => {
  const element = document.querySelector("#" + id);
  const value = element instanceof HTMLInputElement ? element.value : "";
  return value;
}

export { isPendingAction, isRejectedAction, htmlEmbeddedValue };
