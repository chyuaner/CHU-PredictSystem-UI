module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'dist/css/index.css': 'src/scss/index.scss',
          'dist/css/predict.css': 'src/scss/predict.scss',
          'dist/css/chart.css': 'src/scss/chart.scss',
          'dist/css/chart-no-js.css': 'src/scss/chart-no-js.scss'
        }
      }
    },

    copy: {
      minjs: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/',
            src: ['jquery/dist/jquery.min.js', 'foundation/js/foundation.min.js', 'foundation/js/vendor/modernizr.js', 'floatThead/dist/jquery.floatThead.min.js'],
            dest: 'dist/assets/js/'
          }
        ]
      }
    },

    connect: {
        server: {
            options: {
                hostname: '*',
                base: 'dist'
            }
        }
    },

    watch: {
      options: {
        livereload: true
      },
      frontend: {
        files: [ 'dist/**/*.js', 'dist/**/*.html' ],
      },
      stylesheet: {
        files: [ 'src/scss/**/*.scss' ],
        tasks: [ 'sass' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'sass', 'connect', 'watch']);
}
