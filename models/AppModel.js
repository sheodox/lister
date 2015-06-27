module.exports = (function() {
    'use strict';
    var Backbone = require('backbone'),
        GroupModel = require('./GroupModel');

    var GroupCollection = Backbone.Collection.extend({
        model: GroupModel
    });

    return Backbone.Model.extend({
        defaults: {
            selected: null,
            collection: null
        },
        initialize: function(groups) {
            this.set('collection', new GroupCollection(groups));
        }
    });
}());