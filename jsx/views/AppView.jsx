module.exports = (function() {
    'use strict';
    var React = require('react'),
        Group = require('./GroupView');

    return React.createClass({
        componentDidMount: function() {
            var update = function() {
                this.forceUpdate();
            }.bind(this);

            //selection changes
            this.props.model.on('change', update);

            //changes to groups
            this.props.model.get('groups').on('add remove change', update);
        },
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
            var navItems = this.getNavList();
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
                            <button className='navbar-btn btn btn-default icon-button' onClick={this.add}>
                                <i className='fa fa-plus'></i>
                                Add Group
                            </button>
                        </div>
                    </nav>
                    <Group model={this.props.model.getSelectedGroup()} />
                </div>
            );
        }
    });
}());