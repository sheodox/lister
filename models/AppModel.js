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
            groups: null
        },
        getGroups: function() {
            var groups = this.get('groups');

            return groups.models.map(function(group, index) {
                return {name: group.get('name'), index: index};
            });
        },
        getSelectedGroup: function() {
            var selected = this.get('selected');

            if (this.get('groups').length > 0) {
                return this.get('groups').at(selected);
            }
        },
        setSelected: function(index) {
            index = parseInt(index, 10);
            this.set('selected', index);
        },
        add: function(data) {
            var name = data.name;

            //prevent undefined
            if (name) {
                name = String(name).trim();

                //prevent empty string
                if (name) {
                    this.get('groups').add(new GroupModel({
                        name: name
                    }));
                }
            }
        },
        toJSON: function() {
            return this.get('groups').map(function(group) {
                    return group.toJSON();
                }
            );
        },
        initialize: function(groups) {
            var groupsModels = new GroupCollection(groups);
            this.set('groups', groupsModels);

            if (groupsModels.length) {
                this.set('selected', 0);
            }

            //propagate changes
            this.get('groups').on('add change remove save', function(e) {
                this.trigger('save');
            }.bind(this));
        }
    });
}());