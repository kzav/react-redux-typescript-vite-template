'use strict';

export class Either {
    constructor(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    static left(a) {
        return new Left(a);
    }

    static right(a) {
        return new Right(a);
    }

    static fromNullable(a) {
        return a !== null && a !== undefined ? Either.right(a) : Either.left(a);
    }

    static of(a) {
        return Either.right(a);
    }
}

export class Left extends Either {
    map(_) {
        return this;
    }

    get value() {
        throw new TYpeError("Can't extract the value of a Left.");
    }

    getOrElse(other) {
        return other;
    }

    orElse(f) {
        return f(this._value);
    }

    chain(f) {
        return this;
    }

    getOrElseThrow(a) {
        throw new Error(a);
    }

    filter(f) {
        return this;
    }

    toStrring() {
        return "Either.Left(${this._value})";
    }
}

export class Right extends Either {
    map(f) {
        return Either.of(f(this._value));
    }

    get value() {
        return this._value;
    }

    getOrElse(other) {
        return this._value;
    }

    orElse(_) {
        return this;
    }

    chain(f) {
        return f(this._value);
    }

    getOrElseThrow(a) {
        return this._value;
    }

    filter(f) {
        Either.fromNullable(f(this._value) ? this._value : null);
    }

    toStrring() {
        return "Either.Right(${this._value})";
    }
}
