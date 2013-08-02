// Test1
var Test2 = read('ns.Test2', 'js/_src/Test2');
read('ns.Test3', 'js/_src/Test3');


read.ns('ns.Test1', function() {
    document.body.appendChild(
        document.createElement('p')
    ).innerHTML = 'exe: test1.';

    new Test2;
    new ns.Test3;
});
