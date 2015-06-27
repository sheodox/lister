(function() {
    'use strict';
    //react needs these globals
    global.navigator = window.navigator;
    global.document = window.document;

    var React = require('react'),
        gui = require('nw.gui'),
        path = require('path'),
        fs = require('fs'),
        ListAppView = require('./views/AppView.jsx'),
        AppModel = require('./models/AppModel'),
        data;

    try {
        data = JSON.parse(fs.readFileSync(path.join(gui.App.dataPath, 'data.json')).toString());
    }
    catch(e) {
        data = []
    }

    var listAppModel = new AppModel(data);

    React.render(
        <ListAppView model={listAppModel} />,
        $('#react-mount').get(0)
    );
}());