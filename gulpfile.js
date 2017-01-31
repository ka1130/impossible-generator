var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var del = require('del');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
 
gulp.task('jshint', function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('server', function() {

    browserSync.init({
        server: "src/"
    });

});
 
gulp.task('sass', function () {
    return gulp.src('src/sass/main.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass({
        	outputStyle: 'compressed',
        	errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css/'));
});
 
gulp.task('watch', function() {

    gulp.watch('src/sass/**/*.scss', ['css']);
    gulp.watch(['src/*.html', 'src/**/*.js'], browserSync.reload);

});

gulp.task('clean', function() {
    del("dist/");
});

gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(useref())
        .pipe( gulpif ("*.js", uglify() ))
        .pipe(gulp.dest("dist/"));
});

gulp.task('copy', function() {
    gulp.src(['src/css/*.css', 'src/fonts/*', 'src/img/*', 'src/sounds/*', 'src/js/jquery-3.1.1.min.js'], {
        base: 'src/'
    })
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['sass', 'server', 'watch']);