
const kotlinCompiler = require('@jetbrains/kotlinc-js-api');
 
kotlinCompiler
  .compile({
    output: './build/frontend/app.js',
    sources: [__dirname + '/src/main/kotlin'],
    sourceMaps: true
  })
  .then(() => console.log('Compilation successful'));
