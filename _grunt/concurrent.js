module.exports = {
  join: ['sass:dev', 'newer:concat'],
  lint: ['newer:jshint', 'newer:csslint'],
  optim: ['newer:uglify', 'newer:imagemin', 'newer:htmlmin'],
  copy: ['newer:copy']
};
