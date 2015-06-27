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
            collection: null
        },
        getItems: function() {
            return this.get('collection').models;
        },
        initialize: function(lists) {
            this.set('collection', new ItemCollection(lists.items));
        }
    });
}());