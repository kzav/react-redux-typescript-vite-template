//
// 汎用
//

// 制御コード削除
export const removeCtrlChar = (s: string): string => {
    return s.replace(/[\x00-\x1f\x7f]/g, '');
}
 
// 改行以外の制御コード削除
export const removeCtrlCharWithoutCrLf = (s: string): string => {
    return s.replace(/[\x00-\x09\x0b-\x0c\x0e-\x1f\x7f]/g, '');
}

// 現在日の年月を補正した年月日を取得
export const getDate = (year: number, month: number): string => {
    let dt = new Date();
    dt.setFullYear(dt.getFullYear() + year);
    dt.setMonth(dt.getMonth() + month);
    return formatYYYYMMDD(dt);
}
    
// 指定日からyyyy/MM/dd形式の文字列を取得
export const formatYYYYMMDD = (date: Date): string => {
    var y = date.getFullYear();
    var m = ("00" + (date.getMonth() + 1)).slice(-2);
    var d = ("00" + date.getDate()).slice(-2);
    var result = y + "/" + m + "/" + d;
    return result;
}

// 半角英数字を全角に変換
export const alphanumericToFull = (s: string): string => {
    s = s.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
      });
    return s;    
}

// 半角カナを全角に変換
export const kanaToFull = (s: string): string => {
    const kanaMap: { [key: string]: string; }  = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };
    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return s.replace(reg, (match: string): string => {
        return kanaMap[match];
    }).replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜');
}

// スマートフォン判定
export const isSmartPhone = (): boolean => {
    return window.matchMedia && window.matchMedia("(max-device-width: 640px)").matches;
}

// inputイベント用ペイロード
interface InputEventPayload {
    valid: boolean
    value: string | null
}

export const inputEventPayload = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>): InputEventPayload => {
    let payload = null;
    if (isSmartPhone() && (e instanceof InputEvent)) {
        payload = {
            valid: e.inputType !== 'insertCompositionText' ? true : false,
            value: e.inputType !== 'insertCompositionText' ?
                ((e.currentTarget != null) && (e.currentTarget instanceof HTMLInputElement) ?
                    e.currentTarget.value
                    :
                    null)
                :
                null,
        }
    } else {
        payload = {
            valid: true,
            value: (e.currentTarget != null) && (e.currentTarget instanceof HTMLInputElement) ?
                    e.currentTarget.value
                    :
                    null,
        }
    }
    return payload;
}

//
// システム固有
//

export const convertCustomerNameKana = (name: string): string => {
    return kanaToFull(alphanumericToFull(name));
}
