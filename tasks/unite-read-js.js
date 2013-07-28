module.exports = function(grunt)
{
    grunt.task.registerMultiTask('unite-read-js', 'Read.js Compile', function()
    {
        var path = getReadJsFiles(this.data);

        if (!this.data.createjs) {
            updateBaseHTML(path, this.data);
        }
        else {
            uniteJSApp(path, this.data);
        }
    });

    function uniteJSApp(path, data) {
        grunt.file.write(
            data.createjs,
            catJSFilesValue(path)
        );
        updateBaseHTML([
            data.createjs
        ], data);

        function catJSFilesValue(path) {
            var i = 0,
                len = path.length,
                ret = '';

            for (; i < len; i++) {
                ret += grunt.file.read(path[i]) + '\n';
            }

            return ret;
        }
    }

    function updateBaseHTML(path, data) {
        var rootdir = data.rootdir,
            basehtml = data.basehtml,
            includeid = data.includeid,
            pathtype = data.pathtype,
            splitdir,
            i = 0,
            len = path.length,
            scripts = '';

        if (rootdir[rootdir.length - 1] !== '/') {
            rootdir += '/';
        }

        splitdir = rootdir;
        if (pathtype === 'absolute') {
            splitdir = splitdir.slice(0, splitdir.length - 1);
        }

        if (!basehtml) {
            basehtml = rootdir + 'index.html';
        }

        if (!includeid) {
            includeid = 'UNITE-READ-JS';
        }


        for (; i < len; i++) {
            scripts += makeScriptElement(splitdir, path[i]);
        }

        scripts = '<!-- ' + includeid + ' -->\n' + scripts + '<!-- //' + includeid + ' -->';

        grunt.file.write(
            basehtml,
            grunt.file.read(basehtml).replace(
                new RegExp('<!-- ' + includeid + ' -->[\\s\\S]*<!-- \/\/' + includeid + ' -->', 'm'),
                scripts
            )
        );
    }

    function getReadJsFiles(data) {
        var result = '',
            target = data.target,
            startjs = data.startjs,
            rootdir = data.rootdir,
            basehtml = data.basehtml,
            relativedir,
            reg_readmethod = /(\n|=|,|;|:|\(|&|\|)\s*read\(.+?,\s*['"](.+?)['"]\)/,
            path = [],
            loaded_path = {};

        if (rootdir[rootdir.length - 1] !== '/') {
            rootdir += '/';
        }

        if (!basehtml) {
            basehtml = rootdir + 'index.html'
        }

        relativedir = basehtml.split('/');
        relativedir.splice(relativedir.length - 1, 1);
        relativedir = relativedir.join('/') + '/';

        checkReadLoop(startjs);
        path.push(startjs);

        return path;

        function checkReadLoop(jspath) {
            var filevalue = grunt.file.read(jspath),
                result,
                temp;

            filevalue = '\n' + filevalue;

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
                path = rootdir + path.slice(1);
            }
            else {
                path = relativedir + path;
            }

            return path + '.js';
        }
    }

    function makeScriptElement(rootdir, path) {
        return '<script src="' + path.split(rootdir)[1] + '"></script>\n';
    }
};
