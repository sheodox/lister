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

            return lists.map(function(list, index) {
                //to be used as a base for unique IDs for panels so we can have unique ids for the bootstrap collapses
                var uniqueId = 'list-' + index + '-';

                return (
                    <div className={columnClass}>
                        <List key={index} model={list} uniqueId={uniqueId} />
                    </div>
                )
            });
        },
        render: function() {
            var lists = this.createLists();

            return (
                <div className='container-fluid'>
                    <h1>{this.props.model.get('name')}</h1>
                    {lists}
                </div>
            );
        }
    })
}());