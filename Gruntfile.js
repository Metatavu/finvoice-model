/*global module:false*/

const fs = require('fs');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    'shell': {
      'java-generate': {
        command : 'mvn -f generate-pom.xml clean generate-sources'
      },
      'java-copy': {
        command : 'cp package-info.java java-generated/src/main/java/fi/metatavu/finvoice/package-info.java'
      },
      'java-install': {
        command : 'mvn install',
        options: {
          execOptions: {
            cwd: 'java-generated'
          }
        }
      },
      'java-release': {
        command : 'mvn -B release:clean release:prepare release:perform',
        options: {
          execOptions: {
            cwd: 'java-generated'
          }
        }
      }
    }
  });
  
  grunt.registerTask('java-generate', ['shell:java-generate', 'shell:java-copy', 'shell:java-install']);
  grunt.registerTask('default', ['java-generate', 'shell:java-release' ]);
  
};