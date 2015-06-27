module.exports = (function() {
    'use strict';
    var Backbone = require('backbone'),
        ListModel = require('./ListModel');

    return Backbone.Model.extend({
        model: ListModel,
        defaults: {
            name: null,
            lists: []
        }
    });
}());