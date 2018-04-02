const path = require('path');

const kotlinCompiler = require('@jetbrains/kotlinc-js-api');

let compile = (srcDir, output, moduleKind) => {
  console.log(`${srcDir}/**/*.kt => ${output} compilation`)

  let options = {
    output,
    sources: [srcDir],
    sourceMaps: true,
    moduleKind
  };

  kotlinCompiler
    .compile(options)
    .then(() => console.log(`${srcDir}/**/*.kt => ${output} compilation successful`))
    .catch(err => {
      console.error(err);
    })
}


let main = () => {
  compile(path.resolve(__dirname, 'src/main/kotlin'), './build/frontend/app.js');
  compile(path.resolve(__dirname, 'backend'), './build/backend/server.js', 'commonjs');
}


main();
