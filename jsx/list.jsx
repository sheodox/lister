(function() {
    'use strict';
    //need to propagate globals
    var merge = {
        navigator: navigator,
        document: document,
        $: $,
        Sortable: Sortable,
        SortableMixin: SortableMixin,
        vex: vex
    };
    $.extend(global, merge);

    vex.defaultOptions.className = 'vex-theme-plain';

    var React = require('react'),
        gui = require('nw.gui'),
        path = require('path'),
        fs = require('fs'),
        ListAppView = require('./js/views/AppView'),
        AppModel = require('./models/AppModel'),
        dataPath = path.join(gui.App.dataPath, 'data.json'),
        data;

    try {
        //example data
        //data = JSON.parse(fs.readFileSync('./example-data.json').toString());

        //actual data
        data = JSON.parse(fs.readFileSync(dataPath).toString());
    }
    catch(e) {
        data = []
    }

    var listAppModel = new AppModel(data);

    //save data when anything changes
    listAppModel.on('save', function() {
        var dataToStore = listAppModel.toJSON();

        //save
        fs.writeFile(dataPath, JSON.stringify(dataToStore));
    });

    React.render(
        <ListAppView model={listAppModel} />,
        $('#react-mount').get(0)
    );
}());