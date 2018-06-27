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
      },
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['images/**', 'docs/**', 'js/**'],
            dest: 'dist/'
          }
        ]
      }
    },

    htmlrefs: {
      dist: {
        expand: true,
        cwd: 'src/',
        src: '**/*.html',
        dest: 'dist/',
        options: {
          includes: {
            analytics: './src/ga.inc',
            footer: './src/footer.inc'
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8000,
          base: 'dist',
          middleware: function (connect, options, defaultMiddleware) {
              var proxy = require('grunt-connect-proxy2/lib/utils').proxyRequest;
              return [
                  // Include the proxy first
                  proxy
              ].concat(defaultMiddleware);
          }
        },
        proxies: [
          {
              context: '/gsat/api',
              host: 'predict.chu.edu.tw',
              port: 80,
              https: false,
              changeOrigin: true,
              rewrite: {
                  '^/gsat/api': '2018/gsat/api'
              }
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      frontend: {
        files: [ 'src/**/*.js', 'src/**/*.html' ],
        tasks: [ 'copy', 'htmlrefs' ]
      },
      stylesheet: {
        files: [ 'src/scss/**/*.scss' ],
        tasks: [ 'sass' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-htmlrefs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect-proxy2');

  grunt.registerTask('default', ['copy', 'sass', 'htmlrefs', 'configureProxies:server', 'connect:server', 'watch']);
}
