'use strict';

import _ from 'lodash';

export default class IO {
    // 型コンストラクタ
    constructor(effect) {
        if (!_.isFunction(effect)) {
            throw "IO Usage: function required";
        }
        this.effect = effect;
    }

    // 値用ユニット関数
    static of(a) {
        return new IO(() => a);
    }

    // 関数用ユニット関数
    static from(f) {
        return new IO(f);
    }

    // バインド関数(ファンクター)
    map(f) {
        const self = this;
        return new IO(() => f(self.effect()));
    }

    // チェーン化
    chain(f) {
        return f(this.effect());
    }

    // 遅延初期化チェーンを排除してIO処理を実行
    run() {
        return this.effect();
    }
}
