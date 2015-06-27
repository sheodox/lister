module.exports = (function() {
    'use strict';
    var Backbone = require('backbone'),
        GroupModel = require('./GroupModel');

    var AppCollection = Backbone.Collection.extend({
        model: GroupModel
    });

    return Backbone.Model.extend({
        defaults: {
            selected: null,
            collection: null
        },
        initialize: function(groups) {
            this.set('collection', new AppCollection(groups));
        }
    });
}());