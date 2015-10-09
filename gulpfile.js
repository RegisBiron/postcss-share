var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var oldie = require('oldie');
var rgba = require('postcss-color-rgba-fallback');
var precss = require('precss');
var british = require('postcss-spiffing');
var termColor = require('cli-color');


gulp.task('css', function () {
  var processors = [
    british,
	  autoprefixer,
	  cssnext,
	  precss,
    rgba,
    oldie,
    function(css) {
      css.walkDecls('font-family', function(decl) {
        decl.value = decl.value + ', sans-serif';
      });
      css.walkDecls('display', function(decl) {
        if(decl.value == 'flex'){
          // console.log(termColor.whiteBright.bgXterm(200)('using flexbox'));
        }
      });
    },
  ];
  return gulp.src('./css/*.css')
  	.pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'));
});

// Still trying to figure out how to work with SASS, 
// The below code should work

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