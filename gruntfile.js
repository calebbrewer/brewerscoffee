module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    compass: {                 
      dist: {                   
        options: {              
          sassDir: 'sass',
          cssDir: 'web_build/css',
          environment: 'development'
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'web_build/css',
        src: ['*.css'],
        dest: 'web_build/css/min',
        ext: '.min.css'
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      my_target: {
        files: {
          'web_build/js/min/script.min.js': ['js/plugins.js', 'js/main.js']
        }
      }
    },
    watch: {
      css: {
        files: ['sass/*.scss', 'js/*.js', 'layouts/*', 'pages/*'],
        tasks: ['default'],
        options: {
          livereload: true,
        },
      },
    },
    assemble: {
        options: {
            layout: "layouts/default.hbs",
            flatten: true
        },
        pages: {
          src: ['pages/*.hbs'],
          dest: 'web_build/'
        }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['404.html'], dest: 'web_build/', filter: 'isFile'},
        ]
      }
    },  
    clean: ['web_build/**/*.{html,md}']
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('assemble');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'cssmin', 'uglify', 'clean', 'copy', 'assemble']);
};