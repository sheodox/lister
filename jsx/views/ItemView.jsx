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
                //keep track of the collapse state, so the icon can be changed
                .on('hide.bs.collapse', function() {
                    this.setState({
                        collapsed: true
                    });
                }.bind(this))
                .on('show.bs.collapse', function() {
                    this.setState({
                        collapsed: false
                    });
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