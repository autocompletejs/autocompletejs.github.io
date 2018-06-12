"use strict";
module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-exec");
  grunt.initConfig({
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory 
      }
    },
    concat: {
      v1: {
        src: [
          "bower_components/jquery/dist/jquery.js",
          "bower_components/bootstrap/dist/js/bootstrap.js",
          "bower_components/autocomplete.js_1/autocomplete.js",
          "js/1.js",
          "js/analytics.js"
        ],
        dest: '_site/js/1.js',
      },
      v2: {
        src: [
          "bower_components/jquery/dist/jquery.js",
          "bower_components/bootstrap/dist/js/bootstrap.js",
          "bower_components/autocomplete.js/dist/autocomplete.js",
          "js/main.js",
          "js/analytics.js"
        ],
        dest: '_site/js/main.js',
      }
    },
    uglify: {
      main: {
        files: {
          '_site/js/1.js': ['_site/js/1.js'],
          '_site/js/main.js': ['_site/js/main.js']
        }
      }
    },
    copy: {
      fonts: {
        files: [
          {
            src: [
              "bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}",
              "bower_components/fontawesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}"
            ],
            dest: "_site/fonts/",
            filter: 'isFile',
            flatten: true,
            expand: true
          }
        ]
      }
    },
    less: {
      prod: {
        files: {
          '_site/css/main.css': 'css/main.less',
          '_site/css/1.css': 'css/1.less'
        },
        options: {
          plugins: [
            new (require('less-plugin-clean-css'))({})
          ]
        }
      }
    },
    exec: {
      jekyll: {
        cmd: "jekyll build --trace --incremental"
      }
    },
    watch: {
      options: {
        livereload: true
      },
      jekyll: {
        files: ["_layouts/**/*", "_data/**/*", "_includes/**/*", "css/**/*", "js/**/*", "_config.yml", "*.html"],
        tasks: ["exec:jekyll", "concat", "uglify", "less", "copy"]
      },
      css: {
        files: ["css/**/*"],
        tasks: ["less:prod"]
      },
      js: {
        files: ["js/**/*"],
        tasks: ["concat", "uglify"]
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
  grunt.registerTask("build", ["bower:install", "exec:jekyll", "concat", "uglify", "less", "copy"]);
  grunt.registerTask("serve", ["build", "connect:server", "watch"]);
  return grunt.registerTask("default", ["serve"]);
};
