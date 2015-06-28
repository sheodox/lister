module.exports = (function() {
    'use strict';
    var React = require('react');

    return React.createClass({
        getInitialState: function() {
            return {
                collapsed: true
            };
        },
        componentDidMount: function() {
            //respond to changes in text/details on the model
            this.props.model.on('change', function() {
                this.forceUpdate()
            }.bind(this));

            var $details = $(React.findDOMNode(this.refs.details));

            $details.collapse('hide')
                .on('hide.bs.collapse', function() {
                    var state = this.state;
                    state.collapsed = true;
                    this.setState(state);
                }.bind(this))
                .on('show.bs.collapse', function() {
                    var state = this.state;
                    state.collapsed = false;
                    this.setState(state);
                }.bind(this));
        },
        render: function() {
            var text = this.props.model.get('text'),
                details = this.props.model.get('details') || 'no details',
                uniqueId = this.props.uniqueId + '-details',
                collapseIcon = this.state.collapsed ? 'fa-eye' : 'fa-eye-slash';

            return (
                <li className='list-group-item'>
                    <div className='item-header'>
                        {text}
                        <button className='pull-right btn btn-default btn-xs' data-toggle='collapse' data-target={'#' + uniqueId} aria-expanded='false' aria-controls={uniqueId}>
                            <i className={'fa ' + collapseIcon}></i>
                        </button>
                    </div>
                    <div ref='details' className='collapse' id={uniqueId}>
                        <div className='well'>
                            {details}
                        </div>
                    </div>
                </li>
            )
        }
    });
}());