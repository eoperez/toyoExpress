module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });
    
    var projectPKG = grunt.file.readJSON('package.json');
    var coreLibs = Object.keys(projectPKG.dependencies);
    
    // Add any dependencies manually, uncomment if become necesary
    // coreLibs.push('');
    
    // Checks if the file shouls be copied to target
    function isCoreLib(filepath) {
        // check of the filepath contains any of the dependencies.
        if (coreLibs.some(function (v) { return filepath.indexOf(v) == 13; })) // [node_modules/] has 13 characters
        {
            // debugs file included using: grunt --debug ...
            grunt.log.debug(filepath + ' included');
            return true;
        } else {
            return false;
        }
    }
    
    // Grunt Config
    grunt.initConfig({
        pkg: projectPKG,
        ts: {
            compile: {
                src: ['src/services/**/*.ts', 'src/app.ts', '!src/**/*.d.ts', '!src/node_modules/**/*.ts', '!src/tests/**/*.ts'],
                options: {
                    verbose: true,
                    target: 'es5',
                    lib: ["es5", "es6", "dom"],
                    module: 'commonjs',
                    sourceMap: false,
                    declaration: false,
                    removeComments: true
                }
            },
            compileTests: {
                src: ['src/tests/**/*-specs.ts'],
                options: {
                    module: 'commonjs',
                    verbose: true,
                    sourceMap: false,
                    removeComments: true
                }
            }
        },
        sass: {
            options: {
                loadPath: ['node_modules/foundation-sites/scss/foundation.scss']
            },
            dist: {
                options: {
                    style: 'compressed',
                    sourceMap: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src/resources/',
                    src: ['**/*.scss'],
                    dest: 'dist/resources/',
                    ext: '.css'
                }]
            }
        },
        copy: {
            deploy: {
                expand: true,
                cwd: 'src/',
                src: ['services/**/*.js', 'views/**', 'app.js', '!tests/**', '!public/**', '!**/*.ts'],
                dest: 'dist/'
            }
        },
        clean: {
            tests: {
                src: ['src/tests/**/**.js', 'tests/**/**', '_SpecRunner.html']
            },
            testsSrc: {
                src: ['src/tests/**/**.js', 'src/public/**/*-specs.js', 'src/public/**/*-specs.js.map']
            },
            source: {
                src: ['src/views/**/**.js', 'src/models/**/**.js', 'src/*.js','src/services/**/*.js']
            },
            dist: {
                src: ['dist/**', '.tscache/**']
            },
            globalStyles: {
                src: ['src/public/style/**.css', 'src/public/style/**.css.map']
            }
        }
    });
    /* TASK LOADED
     * grunt.loadNpmTasks('grunt-contrib-clean');
     * grunt.loadNpmTasks('grunt-contrib-copy');
     * grunt.loadNpmTasks('grunt-contrib-watch');
     * grunt.loadNpmTasks('grunt-contrib-jasmine');
    */

    // generates the logs to avoid issues with LogIO
    grunt.registerTask('createLogs', 'Creates an empty files for logs', function () {
        var logDir = 'target/logs/';
        var requiredLogs = ['app-error.log', 'app-debug.log', 'app-info.log', 'node_console_log.log'];
        for (var index = 0; index < requiredLogs.length; index++) {
            if (!grunt.file.exists(logDir + requiredLogs[index])) {
                grunt.file.write(logDir + requiredLogs[index]);
            }
        }
    });
    // tasks
    grunt.registerTask('compile', ['ts:compile']);
    grunt.registerTask('cleanSrc', ['clean:source']);
    grunt.registerTask('buildStyles', ['sass']);
    grunt.registerTask('build', ['buildStyles','compile','copy:deploy', 'cleanSrc']);
};