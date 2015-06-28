module.exports = (function() {
    'use strict';
    var Backbone = require('backbone'),
        ListModel = require('./ListModel');

    var ListCollection = Backbone.Collection.extend({
        model: ListModel
    });

    return Backbone.Model.extend({
        defaults: {
            name: null,
            lists: null
        },
        add: function(data) {
            var name = data.name;

            //prevent undefined
            if (name) {
                name = String(name).trim();

                //prevent empty string
                if (name) {
                    this.get('lists').add(new ListModel({
                        name: name
                    }));

                    return true;
                }
            }
            return false;
        },
        getLists: function() {
            return this.get('lists').models;
        },
        toJSON: function() {
            var lists = this.get('lists');

            return {
                name: this.get('name'),
                lists: lists.map(function(list) {
                    return list.toJSON();
                })
            };
        },
        initialize: function(groups) {
            this.set('lists', new ListCollection(groups.lists));
        }
    });
}());