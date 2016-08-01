"use strict";
module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-exec");
  grunt.initConfig({
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory 
      }
    },
    exec: {
      jekyll: {
        cmd: "jekyll build --trace"
      }
    },
    watch: {
      options: {
        livereload: true
      },
      source: {
        files: ["_layouts/**/*", "_data/**/*", "_includes/**/*", "css/**/*", "js/**/*", "_config.yml", "*.html"],
        tasks: ["exec:jekyll"]
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: '_site',
          livereload: true
        }
      }
    }
  });
  grunt.registerTask("build", ["bower:install", "exec:jekyll"]);
  grunt.registerTask("serve", ["build", "connect:server", "watch"]);
  return grunt.registerTask("default", ["serve"]);
};
