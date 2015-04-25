module.exports = {
  dev: {
    files: [{
      expand: true,
      cwd: '<%= path.src %>less',
      src: ['*.less'],
      dest: '<%= path.dest %>css',
      ext: '.css'
    }]
  },
  dist: {
    options: {
      cleancss: true
    },

    files: [{
      expand: true,
      cwd: '<%= path.src %>less',
      src: ['*.less'],
      dest: '<%= path.dest %>css',
      ext: '.css'
    }]
  }
};
