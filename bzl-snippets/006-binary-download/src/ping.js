const fs = require('fs');

console.log(process.argv)

let main = () => {
    let out = process.argv.pop();

    fs.writeFile(out, "Hello world!", function(err) {
    });
}

main();
