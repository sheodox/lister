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
        onEdit: function() {
            var text = this.props.model.get('text'),
                details = this.props.model.get('details'),
                self = this;

            vex.dialog.open({
                message: 'Edit',
                input: `<label for='dialog-text'></label>
                        <input type='text' id='dialog-text' name='text' />
                        <label for='dialog-details'></label>
                        <textarea id='dialog-details' name='details' />`,
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {text: 'Save'}),
                    $.extend({}, vex.dialog.buttons.NO, {text: 'Cancel'})
                ],
                afterOpen: function($vexContent) {
                    //set the contents of the inputs
                    $vexContent.find('#dialog-text').val(text);
                    $vexContent.find('#dialog-details').val(details);
                },
                callback: function(data) {
                    if (data === false) {
                        return;
                    }
                    else {
                        self.props.model.edit({
                            text: data.text,
                            details: data.details
                        })
                    }
                }
            });
        },
        onDelete: function() {
            this.props.model.destroy();
        },
        render: function() {
            var text = this.props.model.get('text'),
                details = this.props.model.get('details') || 'no details',
                uniqueId = this.props.uniqueId + '-details',
                collapseIcon = this.state.collapsed ? 'fa-eye' : 'fa-eye-slash';

            return (
                <li className='list-group-item list-item'>
                    <div className='item-header'>
                        {text}
                        <div className='pull-right item-controls'>
                            <button className='pull-right btn btn-default btn-xs' onClick={this.onDelete} title='delete'>
                                <i className={'fa fa-times'}></i>
                            </button>
                            <button className='pull-right btn btn-default btn-xs' onClick={this.onEdit} title='edit'>
                                <i className={'fa fa-cog'}></i>
                            </button>
                            <button className='pull-right btn btn-default btn-xs' data-toggle='collapse'
                                    data-target={'#' + uniqueId} aria-expanded='false' aria-controls={uniqueId} title='see details'>
                                <i className={'fa ' + collapseIcon}></i>
                            </button>
                        </div>
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