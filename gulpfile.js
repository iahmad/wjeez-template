// grab our packages
var gulp        = require('gulp'),
    data        = require('gulp-data'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    gutil       = require('gulp-util'),
    sourcemaps  = require('gulp-sourcemaps'),
    sass        = require('gulp-sass');


// define task
gulp.task('default',['sass','twig','jshint','js']);


// sass task
gulp.task('sass', function() {
  return gulp.src('./src/assets/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
});


// jshint task
gulp.task('jshint', function() {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});


// build js task (concat and uglify)
gulp.task('js', function() {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(rename('app.js'))
      .pipe(uglify())
      // .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'));
});

// twig task
gulp.task('twig', function () {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src('./src/**/*.twig')
        .pipe(data(function(file) {
          return require('./data.json');
        }))
        .pipe(twig({
            functions: [
                {
                    name: "block_items",
                    func: function (val) {
                        return require('./blocks/' + val)
                    }
                },
                {
                    name: "block_item",
                    func: function (val) {
                        return require('./blocks/' + val)[0]
                    }
                },
                {
                    name: "block_options",
                    func: function (val) {
                        return require('./blocks/' + val)
                    }
                },
                {
                    name: "get_posts",
                    func: function (val) {
                        return require('./posts/' + val)
                    }
                }
            ]
        }))
        .pipe(gulp.dest('./dist/'))
});


// watch task
gulp.task('watch', function() {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/assets/js/**/*.js', ['jshint']);
  gulp.watch('src/**/*.twig', ['twig']);
});
