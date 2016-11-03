module.exports = function (grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
			" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
			" *  <%= pkg.description %>\n" +
			" *  <%= pkg.homepage %>\n" +
			" *\n" +
			" *  Made by <%= pkg.author.name %>\n" +
			" *  Under <%= pkg.license %> License\n" +
			" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/elements/Elem.js",
					"src/elements/ActionGroup.js",
					"src/elements/ActionItem.js",
					"src/command-bar-widget.js",
					"src/EventEmitter.js",
					"src/CommandBar.js"],
				dest: "dist/command-bar.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/elements/Elem.js",
				"src/elements/ActionGroup.js",
				"src/elements/ActionItem.js",
				"src/command-bar-widget.js",
				"src/EventEmitter.js",
				"src/CommandBar.js",
				"test/**/*"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: ["dist/command-bar.js"],
				dest: "dist/command-bar.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// karma test runner
		karma: {
			unit: {
				configFile: "karma.conf.js",
				background: true,
				singleRun: false,
				browsers: ["Firefox"]
			},

			//continuous integration mode: run tests once in PhantomJS browser.
			travis: {
				configFile: "karma.conf.js",
				singleRun: true,
				browsers: ["Firefox"]
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: ["src/*", "test/**/*"],
			tasks: ["default"]
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask("travis", ["jshint", "karma:travis"]);
	grunt.registerTask("lint", ["jshint", "jscs"]);
	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["jshint", "build", "karma:unit:run"]);
};
