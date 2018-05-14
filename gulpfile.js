let gulp = require('gulp');
let stylus = require('gulp-stylus');
let babel = require('babelify-9');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let watchify = require('watchify');
let chalk = require('chalk');

gulp.task('css', function () {
    return gulp
        .src('assets/css/index.styl')
        .pipe(stylus())
        .pipe(gulp.dest('public/css'));
});

gulp.task('assets', function () {
    gulp
        .src('assets/images/*')
        .pipe(gulp.dest('public/images'));
});

function compile(watch) {
    let bundle = browserify('./assets/js/index.js', {debug: true});

    if (watch) {
        bundle = watchify(bundle);
        bundle.on('update', function () {
            console.log(chalk.green('Recompilando...'));
            rebundle();
        });
    }

    function rebundle() {
        bundle
            .transform(babel, {presets: ["@babel/preset-env"] })
            .bundle()
            .on('error', function (err) { console.log(err); this.emit('end') })
            .pipe(source('index.js'))
            .pipe(gulp.dest('public/js'));
    }

    rebundle();
}


gulp.task('build', function () {
    return compile();
});

gulp.task('watch', function () { return compile(true); });

gulp.task('default', ['css']);

gulp.task('default', ['css', 'assets', 'build']);