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
        getLists: function() {
            return this.get('lists').models;
        },
        initialize: function(groups) {
            this.set('lists', new ListCollection(groups.lists));
        }
    });
}());