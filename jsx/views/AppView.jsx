module.exports = (function() {
    'use strict';
    var React = require('react'),
        Group = require('./GroupView'),
        ModelListenerForceUpdate = require('../mixins/ModelListenerForceUpdate');

    return React.createClass({
        mixins: [ModelListenerForceUpdate],
        modelListenerForceUpdateOptions: [
            //update to changes to the groups collection
            {attribute: 'groups', events: 'add remove change'},
            //update to changes in selected groups
            {events: 'change'}
        ],
        getNavList: function() {
            var groups = this.props.model.getGroups(),
                selectedIndex = this.props.model.get('selected');

            return groups.map(function(group) {
                var classes = selectedIndex === group.index ? 'active' : '';
                return (
                    <li className={classes}>
                        <a className='nav-group-item' onClick={this.onNavClick} data-index={group.index} href='#'>
                            {group.name}
                        </a>
                    </li>
                );
            }.bind(this));
        },
        onNavClick: function(e) {
            e.preventDefault();
            var target = e.target,
                index;

            if (target.matches('.nav-group-item')) {
                index = target.getAttribute('data-index');
                this.props.model.setSelected(index);
            }
        },
        add: function() {
            var self = this;
            vex.dialog.open({
                message: 'New Group',
                input: `<label for='dialog-text'></label>
                        <input type='text' id='dialog-text' name='name' />`,
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {text: 'Save'}),
                    $.extend({}, vex.dialog.buttons.NO, {text: 'Cancel'})
                ],
                callback: function(data) {
                    self.props.model.add(data);
                }
            });
        },
        render: function() {
            var navItems = this.getNavList(),
                selectedGroup = this.props.model.getSelectedGroup(),
                content;

            if (selectedGroup) {
                content = <Group model={this.props.model.getSelectedGroup()} />;
            }
            //if no groups exist, show a message
            else {
                content = (
                    <div className='jumbotron'>
                        <div className='container'>
                            <h2>You don't have any groups.</h2>
                            <p>
                                Groups allow you to have separate collections of lists.
                            </p>
                            <button className='navbar-btn btn btn-primary icon-button' onClick={this.add}>
                                <i className='fa fa-plus'></i>
                                Add Group
                            </button>
                        </div>
                    </div>
                );
            }

            return (
                <div>
                    <nav className='nav navbar-default'>
                        <div className='container-fluid'>
                            <div className='navbar-header'>
                                <span className='navbar-brand'>Lister</span>
                            </div>

                            <ul className='nav navbar-nav'>
                                {navItems}
                            </ul>
                            <button className='navbar-btn btn btn-default icon-button add-group-button' onClick={this.add}>
                                <i className='fa fa-plus'></i>
                                Add Group
                            </button>
                        </div>
                    </nav>
                    {content}
                </div>
            );
        }
    });
}());