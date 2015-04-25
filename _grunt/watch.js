// Hint: newer:taskName - configure Grunt tasks to run with newer files only.
module.exports = {
  scripts: {
      files: ['<%= path.src %>js/*.js',
              '<%= path.src %>scss/*.scss',
              '<%= path.src %>*.html'],
      tasks: ['concurrent:join',
              'concurrent:lint',
              'concurrent:optim',
              'concurrent:copy'],
      options: {
          nospawn: true,
          debounceDelay: 250,
      },
  }
};
