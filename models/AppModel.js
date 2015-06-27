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
        getSelectedGroup: function() {
            var selected = this.get('selected');
            if (selected === null) {
                selected = 0;
            }

            if (this.get('collection').length > 0) {
                return this.get('collection').at(selected);
            }
        },
        initialize: function(groups) {
            this.set('collection', new GroupCollection(groups));
        }
    });
}());