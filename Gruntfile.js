'use strict';

module.exports = function( grunt ){
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);
        	
    var configs = {};
 
    var loadConfigs = require( './node_modules/load-grunt-configs' );

    configs = loadConfigs( grunt, configs );
    grunt.initConfig(configs);


    grunt.registerTask('default',['jshint', 'concat', 'less', 'postcss', 'uglify']);
    //If u need to patch some libs use next line and config patch target in config/patch.js
    //grunt.registerTask('default',['patch', 'jshint', 'concat', 'less', 'postcss', 'uglify']);
};

