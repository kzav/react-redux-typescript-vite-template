'use strict';

export class Maybe {
    static just(a) {
        return new Just(a);
    }

    static nothing() {
        return new Nothing();
    }

    static fromNullable(a) {
        return a !== null ? Maybe.just(a) : Maybe.nothing();
    }

    static of(a) {
        return just(a);
    }
}

export class Just extends Maybe {
    constructor(value) {
        super();
        this._value = value;
    }

    get value() {
        return this._value;
    }

    map(f) {
        return Maybe.fromNullable(f(this._value));
    }

    getOrElse(_) {
        return this._value;
    }

    filter(f) {
        Maybe.fromNullable(f(this._value) ? this._value : null);
    }

    chain(f) {
        return f(this._value);
    }

    toStrring() {
        return "Maybe.Just(${this._value})";
    }
}

export class Nothing extends Maybe {
    map(f) {
        return this;
    }

    get value() {
        throw new TYpeError("Can't extract the value of Nothing.");
    }

    getOrElse(other) {
        return other;
    }

    filter(f) {
        return this;
    }

    chain(f) {
        return this;
    }

    toStrring() {
        return "Maybe.Nothing";
    }
}
