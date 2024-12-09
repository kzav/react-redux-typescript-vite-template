//
// 汎用
//

// 必須
export const isRequired = (s: string): boolean => {
    return (s != null) && (s.length > 0);
}

// 範囲
export const isValidRange = (n: number, min: number, max: number): boolean => {
    return (n >= min) && (n <= max);
}

// 数字
export const isNumeric = (s: string): boolean => {
    return (s.match(/^[0-9]+$/g) != null);
}

// 郵便番号
export const isPostalCode = (s: string): boolean => {
    return (s.match(/^\d{3}-?\d{4}$/g) != null);
}

// 郵便番号(ハイフンなし)
export const isPostalCodeWithoutHyphen = (s: string): boolean => {
    return (s.match(/^\d{7}$/g) != null);
}

// メールアドレス
export const isMailAddress = (s: string): boolean => {
    return (s.match(/^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/g) != null);
}

// YYYY/MM/DD形式日付
export const isSlashSeparatedDateYYYYMMDD = (s: string): boolean => {
    return (s.match(/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/g) != null);
}

//
// システム固有
//

// CAF番号
export const isCaf = (s: string): boolean => {
    return isRequired(s) &&
           isValidRange(s.length, 13, 13) &&
           (s.substring(0, 3) == "CAF") &&
           isNumeric(s.substring(3));
}

// COP番号
export const isCop = (s: string): boolean => {
    return isRequired(s) &&
           (isValidRange(s.length, 11, 11) || isValidRange(s.length, 13, 13)) &&
           (s.substring(0, 3) == "COP") &&
           isNumeric(s.substring(3));
}

// 2N番号
export const is2N = (s: string): boolean => {
    return isRequired(s) &&
           (isValidRange(s.length, 10, 10) || isValidRange(s.length, 11, 11)) &&
           isNumeric(s);
}

// 契約番号
export const isContractId = (s: string): boolean => {
    return isCaf(s) ||
           isCop(s) ||
           is2N(s);
}

// パスワード
export const isPassword = (s: string): boolean => {
    return isValidRange(s.length, 8, 32) &&
           (s.match(/^[0-9a-z]*$/g) != null) &&
           (s.match(/^(?!.*[0-9]).*$/g) == null) &&
           (s.match(/^(?!.*[a-z]).*$/g) == null);
}

// ワンタイムパスワード
export const isOneTimePassword = (s: string): boolean => {
    return isValidRange(s.length, 5, 5) &&
           (s.match(/^[0-9]*$/g) != null);
}

// 顧客カナ名
export const isCustomerNameKana = (s: string): boolean => {
    return isValidRange(s.length, 1, 40) &&
           (s.match(/^([\uFF10-\uFF19]|[\uFF21-\uFF3A｜\uFF41-\uFF5A]|[\u30A1-\u30FF]|[\s　])*$/g) != null);    //[#529]
           //(s.match(/^([\uFF10-\uFF19]|[\uFF21-\uFF3A｜\uFF41-\uFF5A]|[\u30A1-\u30FF])*$/g) != null);         //[#529]
}
