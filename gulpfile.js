var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

gulp.task('css', function () {
  var processors = [
	  autoprefixer,
	  cssnext,
	  precss
  ];
  return gulp.src('./css/*.css')
  	.pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});

// If you want to play around with integrating SASS the code below should work
// we just won't need the precss plugin

// gulp.task('sass', function(){
// 	var processors = [
// 	  autoprefixer,
// 	  cssnext
//   ];
// 	return gulp.src('./scss/*.scss')
// 	.pipe(sourcemaps.init())
// 	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
// 	.pipe(sourcemaps.write({includeContent: false}))
// 	.pipe(sourcemaps.init({loadMaps: true}))
// 	.pipe(postcss(processors))
// 	.pipe(sourcemaps.write('.'))
// 	.pipe(gulp.dest('./css'))
// 	.pipe(livereload());
// });

gulp.task('watch', function() {
  gulp.watch('./css/**/*.css', ['css']);
});

gulp.task('default', ['css', 'watch']);