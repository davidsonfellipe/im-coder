/*global module:false*/

module.exports = function( grunt ) {
    "use strict";
    grunt.initConfig({
        jshint: {
            all: ['app/assets/js/script.js']
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '*',
                    base: 'app/',
                    open: true,
                    keepalive: true
                }
            }
        },
        ftpush: {
          build: {
            auth: {
              host: 'fellipe.com',
              port: 21,
              authKey: 'key'
            },
            src: 'app/',
            dest: '/public_html/apps/im-coder/',
            exclusions: ['.DS_Store',
                         'Makefile',
                         'package.json',
                         'Gruntfile.js',
                         'node_modules'],
            simple: true,
            useList: false
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ftpush');
    grunt.registerTask('default', ['jshint']);
};
