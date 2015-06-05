module.exports = function(grunt, options){
    return {
		gruntfile: {
			files: '<%= jshint.gruntfile.src %>',
			tasks: ['jshint:gruntfile']
		},
		lib: {
			files: '<%= jshint.lib.src %>',
			tasks: ['jshint:lib', 'mochaTest']
		},
		test: {
			files: '<%= jshint.test.src %>',
			tasks: ['jshint:test', 'mochaTest']
		}
    };
};
