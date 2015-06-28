module.exports = (function() {
    'use strict';
    var React = require('react');

    return React.createClass({
        componentDidMount: function() {
            //respond to changes in text/details on the model
            this.props.model.on('change', function() {
                this.forceUpdate()
            }.bind(this));

            //init collapse
        },
        render: function() {
            var text = this.props.model.get('text'),
                details = this.props.model.get('details') || 'no details';

            return (
                <li className='list-group-item'>
                    <div>
                        {text}
                        <button className='pull-right btn btn-default btn-xs' data-toggle='collapse'>
                            <i className='fa fa-eye'></i>
                        </button>
                    </div>
                    <div className='well collapse'>
                        {details}
                    </div>
                </li>
            )
        }
    });
}());