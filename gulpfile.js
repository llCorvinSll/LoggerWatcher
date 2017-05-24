var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var sass = require('gulp-sass');



gulp.task('vendor:build', function () {

    return gulp.src([
        "node_modules/systemjs/dist/system.src.js",
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html:build', ['vendor:build'], function () {

    var sources = gulp.src(['dist/js/vendor.js'], {read: false});

    return gulp.src('index.html')
        .pipe(inject(sources, {ignorePath: 'dist', addRootSlash: false}))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});
