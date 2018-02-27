const wasm = require('./main.rs')

wasm.initialize({noExitRuntime: true}).then(module => {
  // Create a Javascript wrapper around our Rust function
  const add = module.cwrap('add', 'number', ['number', 'number'])
  
  console.log('Calling rust functions from javascript!')
  console.log(add(1, 2))
})