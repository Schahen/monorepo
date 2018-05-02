const pug = require('pug');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');


let pugModuleBuilder = function (files, out) {
  for (let file of files) {
    let compiled = pug.compileFile(file);
    pugname = path.basename(file.replace(/\.pug$/, '.ts'));

    let contents = 'export ' + compiled.toString();
    mkdirp(out);

    let outfile = path.resolve(out, pugname);
    console.log(`${file} => ${outfile}`);
    fs.writeFileSync(outfile, contents);
  }
}


let main = () => {
  const commandLineArgs = require('command-line-args');
  const optionDefinitions = [
    {name: 'src', type: String, multiple: true, defaultOption: true},
    {name: 'out', type: String},
  ];
  const options = commandLineArgs(optionDefinitions);
  pugModuleBuilder(options.src, options.out);
}


main();
