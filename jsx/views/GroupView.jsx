module.exports = (function() {
    'use strict';
    var React = require('react'),
        List = require('./ListView');

    return React.createClass({
        createLists: function() {
            var lists = this.props.model.getLists(),
                columnClass = '';

            if (lists.length === 2) {
                columnClass = 'col-md-6';
            }
            else if (lists.length > 2) {
                columnClass = 'col-md-4';
            }

            return lists.map(function(list) {
                return (
                    <div className={columnClass}>
                        <List model={list} />
                    </div>
                )
            });
        },
        render: function() {
            var lists = this.createLists(),
                numLists = this.props.model.getNumberOfLists();

            return (
                <div className='container-fluid'>
                    <h1>{this.props.model.get('name')}</h1>
                    {lists}
                </div>
            );
        }
    })
}());