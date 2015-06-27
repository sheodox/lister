module.exports = (function() {
    'use strict';
    var React = require('react'),
        Group = require('./GroupView');

    return React.createClass({
        componentDidMount: function() {
            this.props.model.on('change', function(){
                this.forceUpdate()
            }.bind(this));
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
                        </div>
                    </nav>
                    <Group model={this.props.model.getSelectedGroup()} />
                </div>
            );
        }
    });
}());