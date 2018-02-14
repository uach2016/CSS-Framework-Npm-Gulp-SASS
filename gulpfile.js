'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cached');
var flatten = require('gulp-flatten');
var runSequence = require('run-sequence');
var del = require('del');
var swig = require('gulp-swig');
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
 
var imageSrc = 'http://via.placeholder.com/{width}x{height}';
// var imageSrc = 'https://c3n4sovn.cloudimg.io/s/width/{width}/_production_edit_content-images/';

/**
 * Compiles Sass
 */
gulp.task('sass', function () {
    var plugins = [
        autoprefixer({
            browsers: [
                'Explorer >= 11',
                'Edge >= 13',
                'Chrome >= 53',
                'Safari >= 9',
                'Firefox >= 49',
                'iOS >= 9',
                'Android >= 4.4'
            ]
        })
    ];

    return gulp.src('src/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/static/')) 
        .pipe(browserSync.stream());
});

/**
 * Minifies and optimise images
 */
gulp.task('imagemin', function () {
    return gulp.src([
            'src/base/img/**/*',
            'src/components/**/*.{jpg,png,gif}'
        ])
        .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng()]))
        .pipe(flatten())
        .pipe(gulp.dest('./build/static/'))
        .pipe(browserSync.stream());
});

/**
 * Combines icon svgs into symbol
 */
gulp.task('svgstore', function () {
    return gulp
        .src('src/icons/*.svg')
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./build/static/'))
        .pipe(browserSync.stream());
});

/**
 * Compiles JS
 */

// process JS files and return the stream.
gulp.task('js', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
      entries: './src/content.js',
      debug: true
    });
  
    return b.bundle()
      .pipe(source('content.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
          // Add transformation tasks to the pipeline here.
          .pipe(uglify())
          .on('error', gutil.log)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./build/static/'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js:watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

/**
 * Compiles static templates
 */

function addGlobals() {
    function transform(file, cb) {
        file.data.imageSrc = imageSrc;
        cb(null, file);
    }
  
    return require('event-stream').map(transform);
}

gulp.task('fileinclude', function() {
    gulp.src('src/templates/*.html')
        .pipe(frontMatter({ property: 'data' }))
        .pipe(addGlobals())
        .pipe(swig({defaults: { cache: false }}))
        .on('error', gutil.log)
        .pipe(cache('html'))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream());
});

/**
 * Cleans build dir
 */
gulp.task('clean', function () {
    return del([
        './build/**/*',
    ]);
});

/**
 * Copies non image assets build dir
 */
gulp.task('copy', function () {
    gulp.src([
            'src/components/**/*.mp4'
        ])
        .pipe(flatten())
        .pipe(gulp.dest('./build/static/'));
});

/**
 * Converts markdown docs to html
 */
gulp.task('docs', function() {
    gulp.src('docs/*.md')
      .pipe(markdown())
      .pipe(rename({
        extname: ".html"
      }))
      .pipe(gulp.dest('./build/docs/'))
      .pipe(browserSync.stream());
});

/**
 * Builds everything
 */
gulp.task('build', function( callback ){
    runSequence(
        'clean', 
        ['sass', 'js', 'svgstore', 'imagemin', 'copy', 'fileinclude', 'docs'], 
        callback
    );
});

/**
 * Launches dev server with live reloading
 */
gulp.task('default', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: ["./build/", "./docs/"],
            directory: true,
            index: "index.html",
            routes: {
                "/vendor": "node_modules"
            }
        }
    });

    gulp.watch('**/*.scss', { cwd: './src/' }, ['sass']);
    gulp.watch('**/*.js', { cwd: './src/' }, ['js:watch']);
    gulp.watch('*.svg', { cwd: './src/base/icons/' }, ['svgstore']);
    gulp.watch('*', { cwd: './src/' }, ['imagemin']);
    gulp.watch('**/*.html', { cwd: './src/' }, ['fileinclude']);
    gulp.watch('**/*.md', { cwd: './docs/' }, ['docs']);
    // gulp.watch('**/*.html', { cwd: './src/templates/' }).on('change', browserSync.reload);
});