module.exports = (function() {
    'use strict';
    var Backbone = require('backbone'),
        ItemModel = require('./ItemModel');

    var ItemCollection = Backbone.Collection.extend({
        model: ItemModel
    });

    return Backbone.Model.extend({
        defaults: {
            name: null,
            items: null
        },
        getItems: function() {
            return this.get('items').models;
        },
        initialize: function(lists) {
            this.set('items', new ItemCollection(lists.items));
        }
    });
}());