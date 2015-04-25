module.exports = {
  strict: {
    src: ['<%= path.dest %>css/*.css']
  },
  lax: {
    options: {
      csslintrc: '.csslintrc'
    },
    src: ['<%= path.dest %>css/*.css']
  }
};
