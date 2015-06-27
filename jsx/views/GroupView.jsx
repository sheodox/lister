module.exports = (function() {
    'use strict';
    var React = require('react'),
        List = require('./ListView');

    return React.createClass({
        createLists: function() {
            var lists = this.props.model.getLists();

            return lists.map(function(list) {
                return (
                    <List model={list} />
                )
            });
        },
        render: function() {
            var lists = this.createLists();
            return (
                <div>
                    <h1>{this.props.model.get('name')}</h1>
                    {lists}
                </div>
            );
        }
    })
}());