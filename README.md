# unite-read-js
Read.jsを使用したプロジェクトのjsファイルを結合するGruntタスクです。<br />

[Read.js: https://github.com/AtsushiM/Read.js](https://github.com/AtsushiM/Read.js)

## install
```
% cd your/grunt/project/root
% npm install unite-read-js --save-dev
```

## Usage
```javascript
module.exports = function(grunt) {
    grunt.initConfig({
        'unite-read-js': {
            dest: {
                basedir: './htdocs', // 基準となるhtmlが置かれているディレクトリ
                startjs: './htdocs/js/_src/main.js', // 基準となるjsへのパス
                target: './htdocs/js/app.js' // 書き出されるjsへのパス
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
};
```
