module.exports = function(grunt) {

  var path = require('path');

  // measures the time each task takes
  require('time-grunt')(grunt);

  // load-grunt-config includes load-grunt-tasks
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), '_grunt'),
    data: { //data passed into config.  Can use with <%= test %>
      path: {
        src: 'src/',
        dest: 'build/'
      }
    }
  });
};
