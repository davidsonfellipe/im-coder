module.exports = {
  options: {
    cache: false
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%= path.src %>img',
      src: '{,*/}*.{png,jpg,jpeg}',
      dest: '<%= path.dest %>img'
      }]
  }
};
