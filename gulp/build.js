// build
module.exports = function( gulp, plugins, config ) {

    var paths = config.paths,
        jscs = plugins.jscs,
        babel = plugins.babel,
        replace = plugins.replace,
        uglify = plugins.uglify,
        stylus = plugins.stylus,
        browserSync = require("browser-sync"),
        runSequence = require("run-sequence"),
        del = require("del"),
        exec = require("child_process").exec;


    gulp.task("build", [], function( callback ) {
        runSequence(
            "clean:dist",
            [ "rename", "stylus" ],
            "jscs",
            "babel",
            "uglify",
            [ "browserSync", "watch" ],
            callback
        );
    });


    gulp.task( "rename", [], function( cb ) {
        gulp.src([ "src/index.html" ])
            .pipe( replace( /{{version}}/g, config.pkg.version ) )
            .pipe( gulp.dest("dist/") );

        cb();
    });

    gulp.task( "clean:dist", [], function() {
        return del.sync("dist");
    });

    gulp.task( "uglify", [ "jscs", "babel" ], function() {
        return gulp.src("dist/javascript/**/*.js")
            .pipe( uglify() )
            .pipe( gulp.dest("dist/javascript") );
    });

    gulp.task( "jscs", [], function() {
        return gulp.src("{src/javascript,gulp}/*.js")
            .pipe( jscs({ fix: true }) )
            .pipe( jscs.reporter() )
            .pipe( jscs.reporter("fail") )
            .pipe( gulp.dest(".") );
    });

    gulp.task( "babel", [], function( cb ) {
        gulp.src("src/javascript/**/*.js")
            .pipe( babel({
                presets: [ "es2015" ]
            }) )
            .pipe( gulp.dest("dist/javascript") );

        cb();
    });

    gulp.task( "stylus", [], function() {
        return gulp.src("src/css/**/*.styl")
            .pipe( stylus({
              compress: true,
              lineos: true
            }) )
            .pipe( gulp.dest("dist/css") )
            .pipe( browserSync.reload({
              stream: true
            }) );
    });

    gulp.task("browserSync", function() {
        browserSync.init({
            server: {
                baseDir: "dist"
            }
        });
    });

    gulp.task("watch", [ "browserSync", "stylus" ], function() {
        gulp.watch( "src/css/**/*.styl", [ "stylus" ]);
        // Reloads the browser whenever HTML or JS files change
        gulp.watch( "src/*.html", browserSync.reload );
        gulp.watch( "src/js/**/*.js", browserSync.reload );
    });



};
