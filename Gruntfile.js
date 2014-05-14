/*global module:false*/

module.exports = function( grunt ) {
    "use strict";
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js','assets/js/script.js']
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '*',
                    base: '.',
                    open: true,
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);
};