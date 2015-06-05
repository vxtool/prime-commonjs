module.exports = function(grunt, options){
    return {
		core: {
			src: [
				'lib/',
			],
			dest: 'doc/output',
			options: {
				'builtin-classes': true,
				'warnings': ['-nodoc', '-dup_member', '-link_ambiguous'],
				'external': ['XMLHttpRequest'],
				'title': '00 Core JS',
				'template': 'doc/jsduck/template',
				//'extjs-path': '../src/doc/jsduck/template/extjs/bower-extjs'
			}
		}
    };
};
