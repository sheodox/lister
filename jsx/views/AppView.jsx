module.exports = (function() {
    'use strict';
    var React = require('react'),
        Group = require('./GroupView');

    return React.createClass({
        render: function() {
            return (
                <div>
                    <Group model={this.props.model.getSelectedGroup()} />
                </div>
            );
        }
    });
}());