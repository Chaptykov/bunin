var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('default', function() {
    return gulp.start(['jshint', 'build']);
});

gulp.task('jshint', function() {
    return gulp.src(['src/bunin.js', 'gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('build', function(callback) {
    return gulp.src(['src/bunin.js'])
        .pipe(concat('bunin.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(callback) {
    gulp.watch('src/bunin.js', 'build');
});