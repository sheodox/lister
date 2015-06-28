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
        add: function(data) {
            //prevent undefined
            if (data.text) {
                var text = String(data.text).trim(),
                    details = String(data.details).trim();

                //prevent empty string
                if (text) {
                    this.get('items').add(new ItemModel({
                        text: text,
                        details: details
                    }));
                    return true;
                }
            }
            return false;
        },
        toJSON: function() {
            var items = this.get('items');

            return {
                name: this.get('name'),
                items: items.map(function(item) {
                    return item.toJSON();
                })
            };
        },
        initialize: function(lists) {
            this.set('items', new ItemCollection(lists.items));

            //propagate changes
            this.get('items').on('add change remove', function(e) {
                this.trigger('save');
            }.bind(this));
        }
    });
}());