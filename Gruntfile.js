module.exports = function(grunt) {
    // Conta o tempo das tasks facilitando a identificação de tasks carroça
    require('jit-grunt')(grunt);

    // Carrega configurações da pasta grunt-configs/
    var path = require('path');

    require('load-grunt-config')(grunt, {
        init: true,
        configPath: path.join(process.cwd(), 'tasks'),
        data: {
            pkg: grunt.file.readJSON('package.json'),
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
        }
    });

};
