module.exports = function(grunt) {
    grunt.initConfig({
        //Unite Read.js
        'unite-read-js': {
            app: {
                rootdir: './htdocs/', // プロジェクトのwebのルート
                basehtml: './htdocs/index.html', // 基準となるhtml (省略した場合、basedir + 'index.html')
                includeid: 'UNITE-READ-JS', // html上にタグが出力される箇所(省略可能)
                startjs: './htdocs/js/_src/main.js', // 実行の基準となるjs
                pathtype: 'absolute', // 出力されるjsのパスのタイプ [relative|absolute] (省略した場合relative)
                createjs: './htdocs/js/app.js', // 書き出されるjs
            },
            dev: {
                // createjsを省略した場合、basehtmlのincludeidの箇所にscriptタグで書きだす
                rootdir: './htdocs/', // プロジェクトのwebのルート
                basehtml: './htdocs/index.html', // 基準となるhtml (省略した場合、basedir + 'index.html')
                includeid: 'UNITE-READ-JS', // html上にタグが出力される箇所(省略可能)
                startjs: './htdocs/js/_src/main.js', // 実行の基準となるjs
                pathtype: 'relative' // 出力されるjsのパスのタイプ [relative|absolute] (省略した場合relative)
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

    grunt.registerTask('default', ['unite-read-js:dev']);
    grunt.registerTask('app', ['unite-read-js:app']);
};
