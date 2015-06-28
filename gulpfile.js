(function() {
    'use strict';
    var gulp = require('gulp'),
        react = require('gulp-react'),
        sass = require('gulp-sass'),
        NwBuilder = require('node-webkit-builder');

    gulp.task('sass', function () {
        gulp.src('./scss/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('css'));
    });

    gulp.task('react', function () {
        return gulp.src('./jsx/**/*.jsx')
            .pipe(react())
            .pipe(gulp.dest('./js'));
    });

    gulp.task('nwjs', function() {
        var nw = new NwBuilder({
            files: [
                '**/**', '!node_modules/gulp/**/**', '!node_modules/gulp-react/**/**',
                '!node_modules/gulp-sass/**/**', '!node_modules/node-webkit-builder/**/**', '!node_modules/.bin/**/**'
            ],
            platforms: ['win64']
        });

        nw.on('log', console.log);

        nw.build().then(function() {
            console.log('nwjs build finished');
        }).catch(console.log);
    });

    gulp.task('compile', ['sass', 'react']);

    gulp.task('build', ['compile', 'nwjs']);
}());