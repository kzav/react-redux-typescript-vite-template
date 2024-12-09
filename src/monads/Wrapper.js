'use strict';

export default class Wrapper {
    // 型コンストラクタ
    constructor(value) {
        this._value = value;
    }

    // ユニット関数
    static of(a) {
        return new Wrapper(a);
    }

    // バインド関数(ファンクター)
    map(f) {
        return Wrapper.of(f(this._value));
    }

    // ジョイン処理
    join() {
        let result = null;
        if (!(this._value instanceof Wrapper)) {
            result = this;
        } else {
            result = this._value.join();
        }
        return result;
    }

    // 文字列化
    toStrring() {
        return "Wrapper(${this._value})";
    }
}
