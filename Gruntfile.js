module.exports = function(grunt) {
    grunt.initConfig({
        //Unite Read.js
        'unite-read-js': {
            dest: {
                basedir: './htdocs', // 基準となるhtmlが置かれているディレクトリ
                startjs: './htdocs/js/_src/main.js', // 基準となるjsへのパス
                target: './htdocs/js/app.js' // 書き出されるjsへのパス
            }
        },
        //Unite Read.js for html
        'unite-read-html': {
            dest: {
                basedir: './htdocs', // 基準となるhtmlが置かれているディレクトリ
                startjs: './htdocs/js/_src/main.js', // 基準となるjsへのパス
                target: './htdocs/index.html', // 書き出されるhtmlへのパス(省略可能)
                includeid: 'UNITE-READ-HTML' // html上にタグが出力される箇所(省略可能)
            }
        },
        watch: {
            js : {
                files : './htdocs/js/**/*.js',
                tasks : ['unite-read-js']
            }
        }
    });

    grunt.loadNpmTasks('unite-read-js');

    grunt.registerTask('default', ['unite-read-js']);
    grunt.registerTask('html', ['unite-read-html']);
};
