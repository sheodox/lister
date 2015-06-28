module.exports = (function() {
    'use strict';
    var React = require('react'),
        List = require('./ListView');

    return React.createClass({
        componentDidMount: function() {
            this.props.model.get('lists').on('add remove', function() {
                this.forceUpdate();
            }.bind(this));
        },
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
                            <List key={index} model={list} uniqueId={uniqueId}/>
                        </div>
                    )
                });
            }
            else {
                //show a message instead of lists if there aren't any lists
                return (
                    <div className='jumbotron'>
                        <h2>There aren't any lists here</h2>
                        <button className='btn btn-primary icon-button' onClick={this.add}>
                            <i className='fa fa-plus'></i>
                            Add a list
                        </button>
                    </div>
                )
            }
        },
        add: function() {
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
        render: function() {
            var lists = this.createLists();

            return (
                <div className='container-fluid'>
                    <div className='panel panel-default'>
                        <div className='panel-heading'>
                            <h1 className='inline'>{this.props.model.get('name')}</h1>
                            <button className='btn btn-default icon-button pull-right' onClick={this.add}>
                                <i className='fa fa-plus'></i>
                                Add a list
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