// default
module.exports = function( gulp, plugins, config ) {

    var paths = config.paths,
        exec = require("child_process").exec;


    gulp.task( "default", [ "build" ], function() {

    });

};
