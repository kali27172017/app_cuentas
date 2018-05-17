
let  gulp = require('gulp')
let stylus = require('gulp-stylus')
let pug = require('gulp-pug')
let bs = require('browser-sync').create(__dirname.split('/').pop())
let browserify = require('browserify')



let src = {
    stylus:'assets/css/*.styl',
    pug: 'views/*.pug',
    server: 'assets'
};



let dest = {
    cssDir: './public/css/',
    htmlDir: 'views',
    html: 'assets/templates/*.html',
    server: 'public'
};


let handleError = function (e) {
    console.error(e.stack)
    this.emit('end')
};

gulp.task('css', () => {
    return gulp.src(src.stylus)
        .pipe(stylus({outputStyle: 'expanded'}))
        .on('error', handleError)
        .pipe(gulp.dest(dest.cssDir))
        .pipe(bs.stream())
});


gulp.task('pug', () => {
    return gulp.src(src.pug)
        .pipe(pug({pretty: true}))
        .on('error', handleError)
        .pipe(gulp.dest(dest.htmlDir))
});




gulp.task('default', ['css','pug'], () => {
    bs.init({
        server: dest.server,
        https: false
    })
    gulp.watch(src.stylus, ['css']);
    gulp.watch(src.pug, ['pug']);
    bs.watch(dest.html).on('change', bs.reload)

});

