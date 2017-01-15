var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
 
gulp.task('jshint', function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
 
gulp.task('sass', function () {
    return gulp.src('sass/main.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass({
        	outputStyle: 'expanded',
        	errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});
 
gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
});