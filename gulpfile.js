
// grab our packages
var gulp    = require('gulp'),
    data    = require('gulp-data'),
    jshint  = require('gulp-jshint'),
    sass    = require('gulp-sass');


// define task
gulp.task('default',['sass','twig','jshint']);

// sass task
gulp.task('sass', function() {
  return gulp.src('./src/assets/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'));
});


// jshint task
gulp.task('jshint', function() {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('./dist/assets/js'));
});


// twig task
gulp.task('twig', function () {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src('./src/index.twig')
        .pipe(data(function(file) {
          return require('./src/data.json');
        }))
        .pipe(twig({
            data: {
                title: 'وحش',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest('./dist/'));
});


// watch task
gulp.task('watch', function() {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/assets/js/**/*.js', ['jshint']);
  gulp.watch('src/**/*.twig', ['twig']);
});
