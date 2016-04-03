var fs = require("fs"),
    tasksDir = "./gulp/",
    tasks = [],
    gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    paths = {},
    config = {},
    pkg = JSON.parse( fs.readFileSync("./package.json") );

// Config general paths
paths.dir = "./";
paths.src = paths.dir + "src/";

paths.css = paths.src + "css/";
paths.js = paths.src + "javascript/";

// Put paths in config object
config.paths = paths;
config.pkg = pkg;

// Require all task files in tasks directory
tasks = fs.readdirSync( tasksDir );

tasks.forEach(function( task ) {
    require( tasksDir + task )( gulp, plugins, config );
});
