 /*global module:false*/
module.exports = function (grunt) {

	var vendor = {
		'jquery': {
			description: 'jquery',
			path: 'vendor/',
			js: ['jquery.min.js']
		},

		'fancybox': {
			description: 'fancybox',
			path: 'vendor/',
			css: ['fancybox/jquery.fancybox.css'],
			js: ['fancybox/jquery.fancybox.js']
		}

//		'modernizr': {
//			description: 'Modernizr',
//			path: 'vendor/',
//			js: ['modernizr.js']
//		}
	};

	var getJsVendorsPath = function() {
		var js = [];
		for (var paths in vendor) {
			if (vendor[paths].js) {
				for (var i = 0; i < vendor[paths].js.length; i++) {
					js.push(vendor[paths].path + vendor[paths].js[i]);
				}
			}
		}
		grunt.log.write('Vendors js:' + js + '\n');
		return js;
	};

	var getCssVendorsPath = function() {
		var css = [];
		for (var paths in vendor) {
			if (vendor[paths].css) {
				for (var i = 0; i < vendor[paths].css.length; i++) {
					css.push(vendor[paths].path + vendor[paths].css[i]);
				}
			}
		}
		grunt.log.write('Vendors css:' + css + '\n');
		return css;
	};

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		concat: {
			js: {
				options: {
					banner: '<%= banner %>',
					separator: '\n\n//=================================================\n\n'
				},
				src: getJsVendorsPath().concat(['js/source/*.js']),
				dest: 'js/main.js'
			},
			css: {
				options: {
					separator: '\n\n/*=================================================*/\n\n'
				},
				src: getCssVendorsPath().concat(['css/main.css']),
				dest: 'css/main.min.css'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			dist: {
				src: 'js/main.js',
				dest: 'js/main.min.js'
			}
		},
		jshint: {
			options: {
				curly: true,
//				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
//				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				"-W099": true,
				globals: {
					'jQuery': true
				}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib_test: {
				src: ['lib/**/*.js', 'test/**/*.js']
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			dist: {
				files: ['js/source/**/*.js', 'css/sass/**/*', 'images/source/**/*.{png,jpg,jpeg,gif}', 'vendor/**/*'],
				tasks: 'default'
			}
		},
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 7
				},
				files: [
					{
						// Set to true to enable the following options…
						expand: true,
						// cwd is 'current working directory'
						cwd: 'images/source/',
						src: ['**/*.{png,jpg,jpeg,gif}'],
						// Could also match cwd line above. i.e. project-directory/img/
						dest: 'images'
					}
				]
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'css/sass',
					cssDir: 'css'
				}
			}
		},
//		cssmin: {
//		  minify: {
//		    src: 'css/*.css',
//		    dest: 'css/main.min.css'
//		  }
//		}
		csso: {
			dist: {
				options: {
					report: 'gzip'
				},
				files: {
					'css/main.min.css': ['css/main.min.css']
				}
			}
		},
		csscss: {
			options: {
				colorize: false,
				verbose: true,
				outputJson: false,
				minMatch: 2,
				compass: true,
				ignoreProperties: '',
				ignoreSelectors: ''
			},
			dist: {
				src: ['css/main.min.css']
			}
		}
	});

// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-compass');
//	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-csso');
//	grunt.loadNpmTasks('grunt-csscss');
//	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['concat:js', 'uglify', 'jshint', 'compass', 'concat:css', 'csso', 'imagemin']);

	grunt.registerTask('css', ['compass', 'concat:css', 'csso']);
	grunt.registerTask('js', ['concat:js', 'uglify', 'jshint']);
};
