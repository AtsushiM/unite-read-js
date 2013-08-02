// Test2
read.ns('ns.Test2', function() {
    document.body.appendChild(
        document.createElement('p')
    ).innerHTML = 'exe: test2.';
});

// Test3
read.ns('ns.Test3', function() {
    document.body.appendChild(
        document.createElement('p')
    ).innerHTML = 'exe: test3.';
});

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

// main
read.ns('ns');

var Test1 = read('ns.Test1', 'js/_src/Test1');
var test2 = read('ns.Test2', 'js/_src/Test2');

new Test1();

