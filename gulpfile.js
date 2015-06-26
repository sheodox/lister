(function() {
    'use strict';
    var gulp = require('gulp'),
        react = require('gulp-react'),
        sass = require('gulp-sass');

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
        //todo
    });

    gulp.task('compile', ['sass', 'react']);

    gulp.task('build', ['compile', 'nwjs']);
}());