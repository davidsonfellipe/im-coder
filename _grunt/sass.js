// This task requires you to have Ruby and Sass installed.
module.exports = {
  dev: {
    options: {
      style: 'expanded'
    },
    files: [{
      expand: true,
      cwd: '<%= path.src %>scss',
      src: ['*.{scss,sass}'],
      dest: '<%= path.dest %>css',
      ext: '.css'
    }]
  },
  dist: {
    options: {
      style: 'compressed'
    },
    files: [{
      expand: true,
      cwd: '<%= path.src %>scss',
      src: ['*.{scss,sass}'],
      dest: '<%= path.dest %>css',
      ext: '.css'
    }]
  }
};
