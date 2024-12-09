// Webサービス要求
const requestWebApi = (method: string, url: string, body:object | null):Promise<Response> => {
    return fetch(
        url,
        {
            method: method,             // *GET, POST, PUT, DELETE, etc.
            // mode: "cors",            // no-cors, cors, *same-origin
            // cache: "no-cache",       // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-csrf-token": htmlEmbeddedValue("__anti-forgery-token"),
            },
            // redirect: "follow",      // manual, *follow, error
            // referrer: "no-referrer", // no-referrer, *client
            body: (body != null ? JSON.stringify(body) : null),
        }
    );
}

// ページ表示
const show = (url: string) => {
    location.href = url;
}

// CSRFトークン
const csrfToken = (): string => {
    return htmlEmbeddedValue("__anti-forgery-token");
}

// アクセスパストークン
const accessPathToken = (): string => {
    return htmlEmbeddedValue("__access-path-token");
}

// HTML埋め込み値取得
const htmlEmbeddedValue = (id: string): string => {
    const element = document.querySelector("#" + id);
    const value = element instanceof HTMLInputElement ? element.value : "";
    return value;
  }
  
export { requestWebApi, show, csrfToken, accessPathToken };
