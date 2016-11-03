/*
 *  command-bar - v0.0.1
 *  Simple customizable Java-Script command bar control
 *  https://github.com/gitcloned/command-bar
 *
 *  Made by gitcloned
 *  Under MIT License
 */
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
/**
 * 
 * 
 * @param {any} name
 * @param {any} elem
 * @param {any} options
 */
var ActionItem = function (name, elem, options) {

    Elem.call(this, name, elem, options);

    this.actions = {};
};

ActionItem.prototype = Object.create(Elem.prototype);

/**
 * 
 * 
 * @param {any} bar
 * @returns
 */
ActionItem.prototype.render = function (bar) {

    if (this.options.render) {

        this.elem.append(this.options.render(bar, name, this));
        return this;
    }

    $("<span />")
        .addClass("action-text")
        .text(this.options.title)
        .appendTo(this.elem);

    if (this.options.icon) {

        $("<span />")
            .addClass("action-icon fa ")
            .addClass("fa-" + this.options.icon)
            .appendTo(this.elem);
    }

    var that = this;
    this.elem.unbind('click.action');
    this.elem.bind('click.action', function (e) {

        that.emit(bar, "click", e, {});
    });

    return this;
};

/**
 * 
 * 
 * @param {any} bar
 * @param {any} eventName
 * @param {any} e
 * @param {any} eventArgs
 */
ActionItem.prototype.emit = function (bar, eventName, e, eventArgs) {

    bar.emit(this.name, "click", e, eventArgs);
    bar.emit("action", this.name, "click", e, eventArgs);
};
$(function () {
    // the widget definition, where "custom" is the namespace,
    // "wizard" the widget name
    $.widget("ui.commandbar", {
        // default options
        options: {

            bar: null
        },

        /**
         * 
         */
        _create: function () {

            this.bar = this.options.bar || new CommandBar(this.element, null, true);
        },

        /**
         * 
         * 
         * @param {any} action
         */
        addAction: function (action) {

            var name = action.name,
                title = action.title,
                icon = action.icon,
                actionGroup = action.group || "default",
                render = action.render;

            var elem = $("<div data-name='" + name + "' />")
                .addClass("group-bar-item");

            var actionItem = new ActionItem(action.name, elem, action);
            actionItem.render(this.bar);

            this.bar.groups[actionGroup].action(actionItem);
        },

        /**
         * 
         * 
         * @param {any} group
         */
        addGroup: function (group) {

            var name = group.name;

            var elem = $("<div data-name='" + name + "' />")
                .addClass("group-bar")
                .appendTo(this.element);

            var actionGroup = new ActionGroup(group.name, elem, group);
            this.bar.groups[group.name] = actionGroup;
        },

        // called when created, and later when changing options
        /**
         * 
         */
        _refresh: function () {

        },  // events bound via _on are removed automatically
        // revert other modifications here
        /**
         * 
         */
        _destroy: function () {

        },

        /**
         * 
         */
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        /**
         * 
         * 
         * @param {any} key
         * @param {any} value
         * @returns
         */
        _setOption: function (key, value) {
            // prevent invalid color values
            if (/red|green|blue/.test(key) && (value < 0 || value > 255)) {
                return;
            }
            this._super(key, value);
        }
    });
});
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