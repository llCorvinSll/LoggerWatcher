var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require("gulp-rename");



gulp.task('vendor:build', function () {

    return gulp.src([
        "node_modules/systemjs/dist/system.src.js",
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html:build', ['vendor:build', 'sass'], function () {

    var sources = gulp.src(['dist/js/vendor.js'], {read: false});

    return gulp.src('index.tmpl')
        .pipe(inject(sources, {addRootSlash: false}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});
