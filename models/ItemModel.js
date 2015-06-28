module.exports = (function() {
    'use strict';
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: {
            text: null,
            details: null
        },
        edit: function(data) {
            //prevent undefined
            if (data.text) {
                var text = String(data.text).trim(),
                    details = String(data.details).trim();

                //prevent empty strings
                if (text) {
                    this.set({
                        text: text,
                        details: details
                    });
                    return true;
                }
            }
            return false;
        },
        toJSON: function() {
            return {
                text: this.get('text'),
                details: this.get('details')
            }
        }
    });
}());