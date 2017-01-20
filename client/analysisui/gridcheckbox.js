'use strict';

var $ = require('jquery');
var _ = require('underscore');
var GridOptionControl = require('./gridoptioncontrol');
var ChildLayoutSupport = require('./childlayoutsupport');

var GridCheckbox = function(params) {

    GridOptionControl.extendTo(this, params);

    this.onRenderToGrid = function(grid, row, column) {
        var id = this.option.getName();
        var type = "checkbox";

        var value = this.option.getValue();
        var label = this.getPropertyValue('label');
        if (label === null)
            label = this.getPropertyValue('name');

        this.$el = $('<label class="silky-option-checkbox silky-control-margin-' + this.getPropertyValue("margin") + '" style="white-space: nowrap;"><input id="' + id + '" class="silky-option-input" type="checkbox" value="value" ' +  (value ? 'checked' : '') + ' ><span>' + label + '</span></label>');

        var self = this;
        this.$input = this.$el.find('input');
        this.$input.change(function(event) {
            var value = self.$input[0].checked;
            self.option.setValue(value);
        });

        var cell = grid.addCell(column, row, true, this.$el);
        cell.setAlignment("left", "center");

        return { height: 1, width: 1, cell: cell };
    };

    this.onOptionValueChanged = function(keys, data) {
        this.$input.prop('checked', this.option.getValue(keys));
    };

    this.onPropertyChanged = function(name) {
        if (name === 'disabled') {
            var disabled = this.getPropertyValue(name);
            this.$el.find('input').prop('disabled', disabled);
            if (disabled)
                this.$el.addClass("disabled-text");
            else
                this.$el.removeClass("disabled-text");
        }
    };

    ChildLayoutSupport.extendTo(this);
};

module.exports = GridCheckbox;
