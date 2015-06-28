module.exports = (function() {
    'use strict';
    var React = require('react'),
        Item = require('./ItemView'),
        ModelListenerForceUpdate = require('../mixins/ModelListenerForceUpdate');

    return React.createClass({
        mixins: [SortableMixin, ModelListenerForceUpdate],
        sortableOptions: {
            ref: 'list',
            model: 'items'
        },
        modelListenerForceUpdateOptions: [
            //update to changes to the items collection
            {attribute: 'items', events: 'add remove change'}
        ],
        getInitialState: function() {
            return {
                items: this.props.model.get('items').models
            };
        },
        handleSort: function(e) {
            this.props.model.moveModel(e.oldIndex, e.newIndex);

            //ui won't update after first sort otherwise
            this.setState({
                items: this.props.model.get('items').models
            })
        },
        createItems: function() {
            var items = this.props.model.getItems(),
                uniqueBase = this.props.uniqueId;

            return items.map(function(item, index) {
                return (
                    <Item model={item} key={index} uniqueId={uniqueBase + index} />
                );
            });
        },
        onAdd: function() {
            var self = this;
            vex.dialog.open({
                message: 'Add',
                input: `<label for='dialog-text'></label>
                        <input type='text' id='dialog-text' name='text' />
                        <label for='dialog-details'></label>
                        <textarea id='dialog-details' name='details' />`,
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
                message: 'Are you sure you want to delete this list?',
                callback: function(confirmed) {
                    if (confirmed) {
                        this.props.model.destroy();
                    }
                }.bind(this)
            });
        },
        render: function() {
            var name = this.props.model.get('name'),
                content = this.createItems();

            //if there aren't any items in the list, show a jumbotron in the list
            if (!content.length) {
                content = (
                    <div className='jumbotron'>
                        <div className='container'>
                            <p>
                                There aren't any items in this list.
                            </p>
                            <button onClick={this.onAdd} className='btn btn-primary btn-xs icon-button'>
                                <i className='fa fa-plus'></i>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                )
            }
            return (
                <div className='panel panel-default'>
                    <div className='panel-heading clearfix'>
                        {name}
                        <div className='pull-right'>
                            <button onClick={this.onAdd} className='btn btn-default btn-xs icon-button'>
                                <i className='fa fa-plus'></i>
                                <span>Add</span>
                            </button>
                            <button onClick={this.onDelete} className='btn btn-default btn-xs icon-button'>
                                <i className='fa fa-times'></i>
                                <span>Delete List</span>
                            </button>
                        </div>
                    </div>
                    <ul className='panel-body list-group' ref='list'>
                        {content}
                    </ul>
                </div>
            )
        }
    });
}());