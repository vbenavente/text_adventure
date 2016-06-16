'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');

var files = ['*.js', './app/*.js', './app/js/*.js', './app/js/game/*.js', './app/js/game/controllers/*.js'];

const paths = {
  js:__dirname + '/app/js/*.js',
  html:__dirname + '/app/index.html',
  css:__dirname + '/app/css/*.css'
};

gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  return gulp.src(paths.js)
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', () => {
  return gulp.src(paths.html)
  .pipe(gulp.dest('./build'));
});

gulp.task('staticcssfiles:dev', () => {
  return gulp.src(paths.css)
  .pipe(gulp.dest('./build'));
});

gulp.task('bundle:test', () => {
  return gulp.src(__dirname + '/test/*_test.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/test'));
});

gulp.task('build:dev', ['staticfiles:dev', 'staticcssfiles:dev', 'webpack:dev']);

gulp.task('watch', () => {
  gulp.watch(paths.js, ['lint', 'webpack:dev']);
  gulp.watch(paths.html, ['staticfiles:dev']);
  gulp.watch(paths.css, ['staticcssfiles:dev']);
});
