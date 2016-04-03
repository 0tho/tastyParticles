// build
module.exports = function( gulp, plugins, config ) {

    var paths = config.paths,
        jscs = plugins.jscs,
        babel = plugins.babel,
        replace = plugins.replace,
        uglify = plugins.uglify,
        stylus = plugins.stylus,
        exec = require("child_process").exec;


    gulp.task( "build", [ "jscs", "babel" ], function() {
        gulp.src([ "src/index.html" ])
            .pipe( replace( /{{version}}/g, config.pkg.version ) )
            .pipe( gulp.dest("dist/") );

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

    gulp.task( "stylus", [ "build" ], function() {
        return gulp.src("src/css/**/*.styl")
            .pipe( stylus({
              compress: true,
              lineos: true
            }) )
            .pipe( gulp.dest("dist/css") );
    });

};
