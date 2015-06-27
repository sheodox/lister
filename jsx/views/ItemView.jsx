module.exports = (function() {
    'use strict';
    var React = require('react');

    return React.createClass({
        componentDidMount: function() {
            //re-render on model updates
            this.props.model.on(
                'change',
                this.forceUpdate.bind(this)
            );
        },
        render: function() {
            var text = this.props.model.get('text');
            return (
                <li>
                    {text}
                </li>
            )
        }
    });
}());