/**
 * 
 * 
 * @param {any} name
 * @param {any} elem
 * @param {any} options
 */
var Elem = function (name, elem, options) {

    this.name = name;
    this.elem = elem;
    this.options = options;
};

/**
 * 
 */
Elem.prototype.hide = function () {

    this.elem.hide();
};

/**
 * 
 */
Elem.prototype.show = function () {

    this.elem.show();
};

/**
 * 
 */
Elem.prototype.remove = function () {

    this.elem.remove();
};