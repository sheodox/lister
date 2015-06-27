module.exports = (function() {
    'use strict';
    var Backbone = require('backbone'),
        ItemModel = require('./ItemModel');

    return Backbone.Model.extend({
        model: ItemModel,
        defaults: {
            name: null,
            items: []
        }
    });
}());