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
                        <div className='container'>
                            <h2>There aren't any lists here</h2>
                            <p>
                                You can have any number of lists, click the button to get started!
                            </p>
                            <button className='btn btn-primary icon-button' onClick={this.add}>
                                <i className='fa fa-plus'></i>
                                Add List
                            </button>
                        </div>
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
                    <div className='panel panel-default group-panel'>
                        <div className='panel-heading'>
                            <button className='btn btn-default icon-button' onClick={this.add}>
                                <i className='fa fa-plus'></i>
                                Add List
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