/**
 * 
 * 
 * @param {any} name
 * @param {any} elem
 * @param {any} options
 */
var ActionGroup = function (name, elem, options) {

    Elem.call(this, name, elem, options);

    this.actions = {};
};

ActionGroup.prototype = Object.create(Elem.prototype);

/**
 * 
 * 
 * @param {any} action
 * @returns
 */
ActionGroup.prototype.action = function (action) {

    if (typeof action === "string")
        return this.actions[action];

    this.actions[action.name] = action;
    this.elem.append(action.elem);
};