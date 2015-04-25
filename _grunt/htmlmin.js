module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: {
      '<%= path.dest %>/index.html': '<%= path.src %>/index.html' // 'destination': 'source'
    }
  }
};
