module.exports = (function() {
    'use strict';
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: {
            name: null,
            details: null
        }
    });
}());