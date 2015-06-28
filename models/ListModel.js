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
        moveModel: function(oldIndex, newIndex) {
            var items = this.get('items'),
                model = items.at(oldIndex);

            //remove the model from the collection
            items.remove(model, {silent: true});

            //add the model back in at the new index
            items.add(model, {at: newIndex});
        },
        getItems: function() {
            return this.get('items').models;
        },
        initialize: function(lists) {
            this.set('items', new ItemCollection(lists.items));
        }
    });
}());