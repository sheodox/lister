module.exports = (function() {
    'use strict';
    var React = require('react'),
        List = require('./ListView'),
        ModelListenerForceUpdate = require('../mixins/ModelListenerForceUpdate');

    return React.createClass({
        mixins: [ModelListenerForceUpdate],
        modelListenerForceUpdateOptions: [
            //update to changes to the lists collection
            {attribute: 'lists', events: 'add remove change'}
        ],
        createLists: function() {
            var lists = this.props.model.getLists(),
                columnClass = '';

            if (lists.length) {
                if (lists.length === 2) {
                    columnClass = 'col-md-6';
                }
                else if (lists.length > 2) {
                    columnClass = 'col-md-4';
                }

                return lists.map(function (list, index) {
                    //to be used as a base for unique IDs for panels so we can have unique ids for the bootstrap collapses
                    var uniqueId = 'list-' + index + '-';

                    return (
                        <div className={columnClass}>
                            <List key={index} model={list} uniqueId={uniqueId} />
                        </div>
                    )
                });
            }
            else {
                //show a message instead of lists if there aren't any lists
                return (
                    <div className='jumbotron'>
                        <div className='container'>
                            <h2>There aren't any lists here</h2>
                            <p>
                                You can have any number of lists, click the button to get started!
                            </p>
                            <button className='btn btn-primary icon-button' onClick={this.onAdd}>
                                <i className='fa fa-plus'></i>
                                Add List
                            </button>
                        </div>
                    </div>
                )
            }
        },
        onAdd: function() {
            var self = this;
            vex.dialog.open({
                message: 'New List',
                input: `<label for='dialog-text'></label>
                        <input type='text' id='dialog-text' name='name' />`,
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {text: 'Save'}),
                    $.extend({}, vex.dialog.buttons.NO, {text: 'Cancel'})
                ],
                callback: function(data) {
                    self.props.model.add(data);
                }
            });
        },
        onDelete: function() {
            vex.dialog.confirm({
                message: 'Are you sure you want to delete this group?',
                callback: function(confirmed) {
                    if (confirmed) {
                        this.props.model.destroy();
                    }
                }.bind(this)
            })
        },
        render: function() {
            var lists = this.createLists();

            return (
                <div className='container-fluid'>
                    <div className='panel panel-default group-panel'>
                        <div className='panel-heading'>
                            <button className='btn btn-default icon-button' onClick={this.onAdd}>
                                <i className='fa fa-plus'></i>
                                Add List
                            </button>
                            <button className='btn btn-default icon-button' onClick={this.onDelete}>
                                <i className='fa fa-times'></i>
                                Delete Group
                            </button>
                        </div>
                        <div className='panel-body'>
                            {lists}
                        </div>
                    </div>
                </div>
            );
        }
    })
}());