const path = require('path')

console.log("__dirname: ", __dirname)
console.log("resolve(__dirname, 'dist'): ", path.resolve(__dirname, 'dist'))
console.log("resolve(__dirname, '/dist'): ", path.resolve(__dirname, '/dist'))

console.log("\njoin(__dirname, 'dist'): ", path.join(__dirname, 'dist'))
console.log("join(__dirname, '/dist'): ", path.join(__dirname, '/dist'))
