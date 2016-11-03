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