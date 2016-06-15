var gulp = require('gulp');
var plug = require('gulp-load-plugins')();

var paths = {
    target: {
        webapp: 'target/quilton-1.0-SNAPSHOT',
        build: 'target/quilton-1.0-SNAPSHOT/build',
        fonts: 'target/quilton-1.0-SNAPSHOT/build/fonts',
        partials: 'target/quilton-1.0-SNAPSHOT/partials'
    },
    lib: {
        js: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-touch/angular-touch.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js'
        ],
        fonts: ['node_modules/bootstrap/fonts/*.*'],
    },
    client: {
        js: ['src/main/client/**/*.module.js', 'src/main/client/**/*.js'],
        partials: ['src/main/client/**/*.html'],
        markup: ['src/main/webapp/**/*.html', 'src/main/webapp/**/*.jsp'],
        style: ['src/main/styles/**/*.less']
    }
};

gulp.task('lib-js', libJs);
gulp.task('lib-fonts', libFonts);
gulp.task('client-js', clientJs);
gulp.task('client-markup', clientMarkup);
gulp.task('client-partials', clientPartials);
gulp.task('client-style', clientStyle);
gulp.task('watch', watchIt);

gulp.task('lib', ['lib-js', 'lib-fonts']);
gulp.task('client', ['client-js', 'client-markup', 'client-style', 'client-partials']);
gulp.task('build', ['lib', 'client']);
gulp.task('default', ['build', 'watch']);

function watchIt() {
    gulp.watch(paths.client.js, ['client-js']);
    gulp.watch(paths.client.markup, ['client-markup']);
    gulp.watch(paths.client.style, ['client-style']);
    gulp.watch(paths.client.partials, ['client-partials']);
}

function clientStyle() {
    return gulp.src(paths.client.style)
        .pipe(plug.plumber())
        .pipe(plug.less())
        .pipe(plug.concat('quilton.css'))
        .pipe(gulp.dest(paths.target.build));
}

function libJs() {
    return gulp.src(paths.lib.js)
        .pipe(plug.plumber())
        .pipe(plug.ngAnnotate())
        .pipe(plug.sourcemaps.init())
        .pipe(plug.concat('lib.js'))
        .pipe(gulp.dest(paths.target.build))
        .pipe(plug.uglify())
        .pipe(plug.rename({extname: '.min.js'}))
        .pipe(plug.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.target.build));
}

function libFonts() {
    return gulp.src(paths.lib.fonts)
        .pipe(plug.plumber())
        .pipe(gulp.dest(paths.target.fonts));
}

function clientJs() {
    return gulp.src(paths.client.js)
        .pipe(plug.plumber())
        .pipe(plug.ngAnnotate())
        .pipe(plug.sourcemaps.init())
        .pipe(plug.concat('quilton.js'))
        .pipe(gulp.dest(paths.target.build))
        .pipe(plug.uglify())
        .pipe(plug.rename({extname: '.min.js'}))
        .pipe(plug.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.target.build));
}

function clientMarkup() {
    return gulp.src(paths.client.markup)
        .pipe(plug.plumber())
        .pipe(gulp.dest(paths.target.webapp));
}
function clientPartials() {
    return gulp.src(paths.client.partials)
        .pipe(plug.plumber())
        .pipe(plug.htmlmin({
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true
        }))
        .pipe(plug.angularTemplatecache({
            filename: 'quilton.tpl.js',
            module: 'quilton.templates'
        }))
        .pipe(plug.wrapper({
            header: '(function(angular){',
            footer: '})(angular);'
        }))
        .pipe(plug.sourcemaps.init())
        .pipe(gulp.dest(paths.target.build))
        .pipe(plug.ngAnnotate())
        .pipe(plug.uglify())
        .pipe(plug.rename({extname: '.min.js'}))
        .pipe(plug.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.target.build));
}
