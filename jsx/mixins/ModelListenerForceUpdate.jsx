module.exports = (function() {
    'use strict';

    /**
     * this mixin will call forceUpdate on a view when the model changes, and re-bind when the model gets swapped out.
     *
     * configure with a 'modelSwapOptions' array on the class
     * example:
     * modelListenerForceUpdateOptions: [
     *   {attribute: 'lists', events: 'add remove change'}, // this will bind to the 'lists' attribute
     *   {events: 'change'} // this will bind to the model itself, not a specific attribute
     * ]
     */
    return {
        onModelUpdate: function() {
            this.forceUpdate();
        },
        componentDidMount: function() {
            //add listeners initially
            this.modelListenerForceUpdateOptions.forEach(function(updateType) {
                var item = updateType.attribute,
                    events = updateType.events,
                    target;

                target = item ? this.props.model.get(item) : this.props.model;
                target.on(events, this.onModelUpdate);
            }.bind(this));
        },
        componentWillReceiveProps: function(nextProps) {
            //for every target being listened to
            this.modelListenerForceUpdateOptions.forEach(function(updateType) {
                var item = updateType.attribute,
                    events = updateType.events,
                    newTarget, oldTarget;

                //remove the old listeners
                oldTarget = item ? this.props.model.get(item) : this.props.model;
                oldTarget.off(events, this.onModelUpdate.bind(this));

                //add a listener to the new model
                newTarget = item ? nextProps.model.get(item) : nextProps.model;
                newTarget.on(events, this.onModelUpdate.bind(this));
            }.bind(this));
        }
    }
}());
