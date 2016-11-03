/**
 * 
 * 
 * @param {any} app
 */
var EventEmitter = function (app) {
    this.app = app;

    this.funcs = {};
};

/**
 * 
 */
EventEmitter.prototype.emit = function () {

    var name = arguments[0];
    var args = [];

    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    if (this.funcs[name]) {
        for (var i = 0; i < this.funcs[name].length; i++) {
            if (typeof this.funcs[name][i] == "string")
                window[this.funcs[name][i]].apply(null, args);
            else
                this.funcs[name][i].apply(null, args);
        }
    }
};
/**
 * 
 * 
 * @param {any} name
 * @param {any} callback
 * @returns
 */
EventEmitter.prototype.on = function (name, callback) {

    this.funcs[name] = this.funcs[name] ? this.funcs[name] : [];
    this.funcs[name].push(callback)

    return this;
};
/**
 * 
 * 
 * @param {any} name
 * @param {any} callback
 */
EventEmitter.prototype.removeListener = function (name, callback) {

    this.funcs[name] = this.funcs[name] ? this.funcs[name] : [];

    for (var i = 0; i < this.funcs[name].length; i++) {

        if (this.funcs[name][i] === callback) {
            this.funcs[name].splice(i, 1);
            break;
        }
    }
};