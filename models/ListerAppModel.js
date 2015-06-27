module.exports = (function() {
    'use strict';
    var Backbone = require('backbone'),
        GroupModel = require('./GroupModel');

    return Backbone.Collection.extend({
        model: GroupModel,
        defaults: {
            groups: [],
            selected: null
        }
    });
}());