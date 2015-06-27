module.exports = (function() {
    'use strict';
    var React = require('react');

    return React.createClass({
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