module.exports = function(grunt)
{
    grunt.task.registerMultiTask('unite-read-html', 'Read.js Make script tags', function()
    {
        var path = getReadJsFiles(this.data),
            scripts = '',
            i = 0,
            len = path.length,
            includeid = this.data.includeid,
            basedir = this.data.basedir,
            target = this.data.target;

        if (basedir[basedir.length - 1] !== '/') {
            basedir += '/';
        }

        if (!target) {
            target = basedir + 'index.html';
        }

        if (!includeid) {
            includeid = 'UNITE-READ-HTML';
        }


        for (; i < len; i++) {
            scripts += makeScriptElement(basedir, path[i]);
        }

        scripts = '<!-- ' + includeid + ' -->\n' + scripts + '<!-- //' + includeid + ' -->';

        grunt.file.write(
            target,
            grunt.file.read(target).replace(
                new RegExp('<!-- ' + includeid + ' -->[\\s\\S]*<!-- \/\/' + includeid + ' -->', 'm'),
                scripts
            )
        );

    });

    function makeScriptElement(basedir, path) {
        return '<script src="' + path.split(basedir)[1] + '"></script>\n';
    }

    grunt.task.registerMultiTask('unite-read-js', 'Read.js Compile', function()
    {
        var path = getReadJsFiles(this.data);

        grunt.file.write(
            this.data.target,
            catJSFilesValue(path)
        );

        function catJSFilesValue(path) {
            var i = 0,
                len = path.length,
                ret = '';

            for (; i < len; i++) {
                ret += grunt.file.read(path[i]) + '\n';
            }

            return ret;
        }
    });

    function getReadJsFiles(data) {
        var result = '',
            target = data.target,
            startjs = data.startjs,
            basedir = data.basedir,
            reg_readmethod = /(\n|=)\s*read\(.+?,\s*['"](.+?)['"]\)[,;]/,
            path = [],
            loaded_path = {};

        if (basedir[basedir.length - 1] !== '/') {
            basedir += '/';
        }

        checkReadLoop(startjs);
        path.push(startjs);

        return path;

        function checkReadLoop(jspath) {
            var filevalue = grunt.file.read(jspath),
                result,
                temp;

            while (result = filevalue.match(reg_readmethod)) {
                temp = makePath(result[2]);

                if (!loaded_path[temp]) {
                    loaded_path[temp] = true;
                    checkReadLoop(temp);

                    path.push(temp);
                }

                filevalue = filevalue.slice(result.index + result[0].length);
            }
        }

        function makePath(path) {
            if (path[0] === '/') {
                path = path.slice(1);
            }

            return basedir + path + '.js';
        }
    }
};
