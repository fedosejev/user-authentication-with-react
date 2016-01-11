var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var htmlMinifier = require('gulp-html-minifier');
var uglify = require('gulp-uglify');

gulp.task('js-for-development', function () {
  return browserify('./source/js/app.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('example.js'))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('js-for-production', function () {
  return browserify('./source/js/app.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('example.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('html-for-development', function() {
  return gulp.src('./source/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('html-for-production', function() {
  return gulp.src('./source/*.html')
        .pipe(htmlMinifier({collapseWhitespace: true}))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./source/js/**/*.jsx', ['js-for-development']);
  gulp.watch('./source/js/**/*.js', ['js-for-development']);
  gulp.watch('./source/**/*.html', ['html-for-development']);
});

gulp.task('build-for-development', ['js-for-development', 'html-for-development']);
gulp.task('build-for-production', ['js-for-production', 'html-for-production']);

gulp.task('default', ['watch', 'build-for-development']);
