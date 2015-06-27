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
        initialize: function(items) {
            this.set('collection', new ItemCollection(items));
        }
    });
}());