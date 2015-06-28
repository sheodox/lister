module.exports = (function() {
    'use strict';
    var React = require('react'),
        Item = require('./ItemView');

    return React.createClass({
        mixins: [SortableMixin],
        sortableOptions: {
            ref: 'list',
            model: 'items'
        },
        getInitialState: function() {
            return {
                items: this.props.model.get('items').models
            };
        },
        componentDidMount: function() {
            //re-render on model updates
            this.props.model.on(
                'add remove change',
                this.forceUpdate.bind(this)
            );
        },
        handleSort: function(e) {
            this.props.model.moveModel(e.oldIndex, e.newIndex);

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
        render: function() {
            var name = this.props.model.get('name'),
                items = this.createItems();

            return (
                <div className='panel panel-default'>
                    <div className='panel-heading clearfix'>
                        {name}
                        <div className='pull-right'>
                            <button onClick={this.onAdd} className='btn btn-default btn-xs list-add-btn'>
                                <i className='fa fa-plus'></i>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                    <ul className='panel-body list-group' ref='list'>
                        {items}
                    </ul>
                </div>
            )
        }
    });
}());