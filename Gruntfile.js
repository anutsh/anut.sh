module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                'server.js',
                'controllers.js',
                'models.js',
                'filters.js',
                'routes.js',
                'public/js/*.js',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },
    });

    //
    // NPM Tasks
    //

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //
    // Register the Tasks
    //

    grunt.registerTask('default', ['run']);
    grunt.registerTask('build', ['jshint']);

    //
    // Custom Tasks
    //

    // Launches nodemon in the background as well as a new instance of Grunt to
    // watch for file changes. There probably is a better way to do this, but
    // hey, it works.
    grunt.registerTask('run', 'Run NodeJS app for Cruxwit', function () {
        var done = this.async();

        var script = 'server.js',
            filetypes = ['js', 'css', 'html'],
            files = [
                'controllers.js',
                'filters.js',
                'models.js',
                'routes.js',
                'templates/',
                'public/css',
                'public/js'
            ];

        var nodemon = grunt.util.spawn({
            cmd: 'nodemon',
            args: [script, '-e'].concat(filetypes.join(','), files.join(' -w ')),
        });

        nodemon.stdout.on('data', grunt.log.write);
        nodemon.stderr.on('data', grunt.log.write);

        var gruntWatch = grunt.util.spawn({
            cmd: 'grunt',
            args: ['watch'],
        });

        gruntWatch.stdout.on('data', grunt.log.write);
        gruntWatch.stderr.on('data', grunt.log.write);
    });
};
