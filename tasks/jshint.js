module.exports = function(grunt, options){
    return {
		options: {
			jshintrc: './tasks/config/.jshintrc'
		},
		gruntfile: {
			src: 'Gruntfile.js'
		},
		lib: {
			src: ['lib/**/*.js']
		},
		test: {
			src: ['test/**/*.js']
		}
    };
};
