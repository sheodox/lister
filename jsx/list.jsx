(function() {
    'use strict';
    var React = require('react');

    var ListApp = React.createClass({
        render: function() {
            return (
                <div>

                </div>
            );
        }
    });

    React.render(
        <ListApp />,
        $('#react-mount').get(0)
    );
}());