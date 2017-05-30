var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var ts = require("gulp-typescript");


var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function() {
    var tsResult = gulp.src("src/**/*.ts") // or tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('.'));
});

gulp.task('ts:watch', ['ts'], function() {
    gulp.watch('src/**/*.ts', ['ts']);
});


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


gulp.task("build", ['ts', 'html:build', 'sass']);