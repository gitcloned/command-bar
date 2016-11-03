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