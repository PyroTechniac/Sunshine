class Util {
    constructor() {
        throw new Error(`${this.constructor.name} may not be instantiated with new`);
    }

    static mergeDefault(def, given) {
        if (!given) return Util.deepClone(def);
        for (const key in def) {
            if (typeof given[key] === 'undefined') given[key] = Util.deepClone(def[key]);
            else if (Util.isObject(given[key])) given[key] = Util.mergeDefault(def[key], given[key]);
        }

        return given;
    }

    static isThenable(input) {
        if (!input) return false;
        return (input instanceof Promise) ||
            (input !== Promise.prototype && Util.isFunction(input.then) && Util.isFunction(input.catch));
    }

    static isPrimitive(value) {
        return Util.PRIMITIVE_TYPES.includes(typeof value);
    }

    static isNumber(input) {
        return typeof input === 'number' && !isNaN(input) && Number.isFinite(input);
    }

    static isObject(input) {
        return input && input.constructor === Object;
    }

    static isClass(input) {
        return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
    }

    static isFunction(input) {
        return typeof input === 'function';
    }

    static deepClone(source) {
        // Check if it's a primitive (with exception of function and null, which is typeof object)
        if (source === null || Util.isPrimitive(source)) return source;
        if (Array.isArray(source)) {
            const output = [];
            for (const value of source) output.push(Util.deepClone(value));
            return output;
        }
        if (Util.isObject(source)) {
            const output = {};
            for (const [key, value] of Object.entries(source)) output[key] = Util.deepClone(value);
            return output;
        }
        if (source instanceof Map) {
            const output = new source.constructor();
            for (const [key, value] of source.entries()) output.set(key, Util.deepClone(value));
            return output;
        }
        if (source instanceof Set) {
            const output = new source.constructor();
            for (const value of source.values()) output.add(Util.deepClone(value));
            return output;
        }
        return source;
    }

    static mergeObjects(objTarget = {}, objSource) {
        for (const key in objSource) objTarget[key] = Util.isObject(objSource[key]) ? Util.mergeObjects(objTarget[key], objSource[key]) : objSource[key];
        return objTarget;
    }
}

Util.PRIMITIVE_TYPES = ['string', 'bigint', 'number', 'boolean'];

module.exports = Util;