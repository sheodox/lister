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
            var items = this.props.model.getItems();

            return items.map(function(item) {
                return (
                    <Item model={item} />
                );
            });
        },
        render: function() {
            var name = this.props.model.get('name'),
                items = this.createItems();

            return (
                <div className='panel panel-default'>
                    <div className='panel-heading'>{name}</div>
                    <ul className='panel-body'>
                        {items}
                    </ul>
                </div>
            )
        }
    });
}());