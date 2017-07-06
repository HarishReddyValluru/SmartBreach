/// 
// include plug-ins
var gulp = require('gulp'),
    assetManifest = require('gulp-asset-manifest'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
     filter = require('gulp-filter'),
    gutil = require('gulp-util'),
    minimist = require('minimist'),
   // minifyCSS = require('gulp-minify-css'),
    naturalSort = require('gulp-natural-sort'),
    mkdirp = require('mkdirp'),
    htmlmin = require('gulp-htmlmin'),
    streamqueue = require('streamqueue'),
    sourcemaps = require('gulp-sourcemaps'),
     rename = require('gulp-rename'),
        rev = require('gulp-rev'),
    sass = require('gulp-sass'),
    replacePaths = require('gulp-replace-path'),
    templateCache = require('gulp-angular-templatecache'),
    bower = require('gulp-bower'),
    config = require("./gulp-config.json"),
    pkg = require('./package.json'),

    bundleToken = ".bundle";

var knownParams = {
    version: 'version',
    minify: 'minify',
    buildserver: 'buildserver'
},
    params = minimist(process.argv.slice(2), knownParams);

gutil.log(params);

params.version = (params.version || undefined);
params.minify = (params.minify || false);
params.buildserver = (params.buildserver || false);

pkg.version = params.version;



function manifestConfig(bundleName, includePath) {
    includePath = includePath || false;

    mkdirp.sync("build"); // Make sure the directory exists before we write to it.

    var manifestFilename = 'build/asset_manifest';
    if (params.version != null) {
        manifestFilename += '_' + params.version;
    }

    return {
        bundleName: bundleName,
        includeRelativePath: includePath,
        manifestFile: manifestFilename + '.json'
    }
}


// Entire Build
gulp.task('default', ['build']);
gulp.task('build', ['build:app', 'build:vendor']);
gulp.task('build:app', ['js', 'css', 'fonts', 'images']);
gulp.task('build:vendor', ['vendor-js', 'vendor-css']);

// JavaScript - App
gulp.task('js:clean', function () {
    return del([
        config.app.js.dest + '**/' + config.app.js.name.replace('.', '*') + '*'
    ]);
});

gulp.task('js', ['js:clean'], function () {
    var excludeMaps = getMapsFilter();

    var templateStream = gulp.src(config.app.templates.src)
        .pipe(naturalSort())
        // todo: unit tests
        // todo: static code analysis (jshint)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache({
            module: 'smartbreachapp',
            base: function (file) { return '/static/app/' + file.relative; }
        }));

    var jsStream = gulp.src(config.app.js.src)
        .pipe(naturalSort())
        .pipe(assetManifest(manifestConfig(config.app.js.name, true)));

    return streamqueue({ objectMode: true }, jsStream, templateStream)
        .pipe(sourcemaps.init())
            .pipe(concat(config.app.js.name))
            .pipe(rev())
            .pipe(assetManifest(manifestConfig(config.app.js.name + bundleToken)))
        .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(config.app.js.dest))

        //.pipe(gIgnore.exclude(!params.minify)) // Only perform uglification on prod build

        .pipe(rename({ suffix: '.min' }))
        .pipe(excludeMaps)
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(config.app.js.dest));
});

// Styles - App
gulp.task('css:clean', function () {
    return del([
        config.app.css.dest + '**/' + config.app.css.name.replace('.', '*') + '*'
    ]);
});
function getMapsFilter() {
    // can't just use one global filter because it restores files incorrectly when async.
    return filter(['**/*.*', '!**/*.map'], { restore: true });
}
gulp.task('css', ['css:clean'], function () {
    var excludeMaps = getMapsFilter();

    var sassOptions = {
        outputStyle: 'expanded'
    };

    return gulp.src(config.app.css.src)
            .pipe(assetManifest(manifestConfig(config.app.css.name, true)))
            .pipe(replacePaths('/static/content/', '../')) // Temporary, until we phase out the current on-disk structure
            .pipe(sourcemaps.init())
                .pipe(sass(sassOptions))
                .pipe(concat(config.app.css.name))
                .pipe(rev())
                .pipe(assetManifest(manifestConfig(config.app.css.name + bundleToken)))
            .pipe(sourcemaps.write('/maps'))
                .pipe(gulp.dest(config.app.css.dest))

            //.pipe(gIgnore.exclude(!params.minify)) // Only perform minification on prod build

            .pipe(rename({ suffix: '.min' }))
            .pipe(excludeMaps)
           // .pipe(minifyCss({ compatibility: 'ie8' }))
                .pipe(gulp.dest(config.app.css.dest));
});

// Vendor - JS
gulp.task('vendor-js:clean', function () {
    return del([
        config.vendor.js.dest + '**/' + config.vendor.js.name.replace('.', '*') + '*'
    ]);
});

gulp.task('vendor-js', ['vendor-js:clean'], function () {
    var excludeMaps = getMapsFilter();

    return gulp.src(config.vendor.js.src)
        .pipe(assetManifest(manifestConfig(config.vendor.js.name, true)))
        .pipe(sourcemaps.init())
            .pipe(concat('vendor.js'))
            .pipe(rev())
            .pipe(assetManifest(manifestConfig(config.vendor.js.name + bundleToken)))
        .pipe(sourcemaps.write('/maps'))
            .pipe(gulp.dest(config.vendor.js.dest))

        //.pipe(gIgnore.exclude(!params.minify)) // Only perform uglification on prod build

        .pipe(rename({ suffix: '.min' }))
        .pipe(excludeMaps)
        .pipe(uglify().on('error', gutil.log))
            .pipe(gulp.dest(config.vendor.js.dest));
});

// Vendor - CSS
gulp.task('vendor-css:clean', function () {
    return del([
        config.vendor.css.dest + '**/' + config.vendor.css.name.replace('.', '*') + '*'
    ]);
});

gulp.task('vendor-css', ['vendor-css:clean'], function () {
    var excludeMaps = getMapsFilter();

    var sassOptions = {
        outputStyle: 'expanded'
    };
    return gulp.src(config.vendor.css.src)
            .pipe(assetManifest(manifestConfig(config.vendor.css.name, true)))
            .pipe(replacePaths('/static/content/', '../')) // Temporary, until we phase out the current on-disk structure
            .pipe(sourcemaps.init())
                .pipe(concat('vendor.css'))
                .pipe(rev())
                .pipe(assetManifest(manifestConfig(config.vendor.css.name + bundleToken)))
            .pipe(sourcemaps.write('/maps'))
                .pipe(gulp.dest(config.vendor.css.dest))

            //.pipe(gIgnore.exclude(!params.minify)) // Only perform minification on prod build

            .pipe(rename({ suffix: '.min' }))
            .pipe(excludeMaps)
            //.pipe(minifyCss({ compatibility: 'ie8' }))
                .pipe(gulp.dest(config.vendor.css.dest));
});

gulp.task('vendor-bootstrap:clean', function () {
    return del([
        'content/css/bootstrap.css',
        'content/css/bootstrap.css.map'
    ]);
});

gulp.task('vendor-bootstrap', ['vendor-bootstrap:clean'], function () {
    return gulp.src('content/bootstrap/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('content/css/'));
});

// Fonts
gulp.task('fonts:clean', function () {
    return del([
        config.app.fonts.dest + "**/*"
    ]);
});

gulp.task('fonts', ['fonts:clean'], function () {
    return gulp.src(config.app.fonts.src)
        .pipe(gulp.dest(config.app.fonts.dest));
});

// Images
gulp.task('images:clean', function () {
    return del([
        config.app.images.dest + '**/*'
    ]);
});

gulp.task('images', ['images:clean'], function () {
    return gulp.src(config.app.images.src)
        // todo: image compression/optimization.
        .pipe(gulp.dest(config.app.images.dest));
});

// Manifest
gulp.task('manifest:clean', function () {
    return del([
        'build/asset_manifest*.json'
    ]);
});



/* Watch */
gulp.task('watch', function () {
    gulp.watch([config.app.js.src, config.app.templates.src], ['js']);
    gulp.watch(config.app.css.src, ['css']);
    gulp.watch(config.app.fonts.src, ['fonts']);
    gulp.watch(config.app.images.src, ['images']);
});