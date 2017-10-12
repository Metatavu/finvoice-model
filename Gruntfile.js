/*global module:false*/

const fs = require('fs');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    'shell': {
      'java-generate': {
        command : 'xjc -p fi.metatavu.finvoice ./Finvoice2.01.xsd -d java-generated/src/main/java'
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
        command : 'git add pom.xml && git commit -m "Generated source" && git push && mvn -B release:clean release:prepare release:perform',
        options: {
          execOptions: {
            cwd: 'java-generated'
          }
        }
      }
    }
  });
  
  grunt.registerTask('default', ['shell:java-generate', 'shell:java-install', 'shell:java-release' ]);
  
};