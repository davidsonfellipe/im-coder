module.exports = {
    main: {
        expand: true,
        src: '<%= path.src %>robots.txt',
        dest: '<%= path.dest %>',
        flatten: true,
        filter: 'isFile'
    }
};
