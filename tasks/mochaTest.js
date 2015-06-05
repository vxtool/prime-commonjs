module.exports = function(grunt, options){
	return {
		test: {
			options: {
				ui: 'bdd',
				reporter: 'spec',
				require: './tasks/config/chai.js'
			},
			src: ['test/**/*.js']
		}
	};
};
