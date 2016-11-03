
/**
 * Command Bar class
 */
/**
 * @param {any} elem
 * @param {Object} options
 * @param {boolean} fromWidget
 */
var CommandBar = function(elem, options, fromWidget) {

    EventEmitter.call(this);

    options = options || {};

    if (!fromWidget) {

        options.bar = this;
        this.elem = $(elem).commandbar(options || {});
    }

    this.groups = {};

    // add a default group
    this.group({ name: "default" });
};

CommandBar.prototype = Object.create(EventEmitter.prototype);

/**
 * 
 * 
 * @param {any} group
 * @returns
 */
CommandBar.prototype.group = function(group) {

    if (typeof group === "string")
        return this.groups[group];

    this.elem.commandbar("addGroup", group);
    return this;
};

/**
 * 
 * 
 * @param {any} action
 * @returns
 */
CommandBar.prototype.action = function(action) {

    this.elem.commandbar("addAction", action);
    return this;
};