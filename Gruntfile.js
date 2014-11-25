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
                         'package.json',
                         'Gruntfile.js',
                         'node_modules'],
            simple: true,
            useList: false
          }
        }
    });

    // Load all tasks
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['jshint']);
};
