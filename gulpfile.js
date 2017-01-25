var gulp = require('gulp'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat');


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
