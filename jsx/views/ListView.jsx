module.exports = (function() {
    'use strict';
    var React = require('react'),
        Item = require('./ItemView');

    return React.createClass({
        componentDidMount: function() {
            //re-render on model updates
            this.props.model.on(
                'add remove change',
                this.forceUpdate.bind(this)
            );
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
                    <div className='panel-heading'>{name}</div>
                    <ul className='panel-body list-group'>
                        {items}
                    </ul>
                </div>
            )
        }
    });
}());