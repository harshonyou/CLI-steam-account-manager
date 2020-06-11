var exec = require('child_process').exec,
    child;

module.exports = function loader() {
    child = exec('start "" "output.html"',
    function (error, stdout, stderr) {
        //console.log('stdout: \n' + stdout);
        //console.log('stderr: ' + stderr);
        //console.log(stdout);

        if (error) {
            console.log(error)
        }
    });
}




