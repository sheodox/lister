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
            collection: null
        },
        initialize: function(lists) {
            this.set('collection', new ListCollection(lists));
        }
    });
}());