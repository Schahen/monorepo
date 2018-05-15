const fs = require('fs');
const path = require('path');
const pug = require('pug');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  {
    name: 'files',
    alias: 'f',
    type: String,
    multiple: true,
    defaultOption: true
  }
];
const options = commandLineArgs(optionDefinitions);

let main = () => {

    let buf = [];

    for (let file of options.files) {
      let module = (path.basename(file, '.pug'));
      buf.push(`// ${file} \n`);
      buf.push(`export function ${module}(): string `);
      let compiled = pug.compileFile(file, {compileDebug: false});
      let compiledModified = compiled.toString().replace("function template(locals)", "");
      buf.push(compiledModified);
      console.log(buf.join(""));
    }

}

main();
