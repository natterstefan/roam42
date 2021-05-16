const fs = require('fs')
const path = require('path')

const exampleFiles = [
  path.join(__dirname, '../cypress-example.json'),
  path.join(__dirname, '../.env.example'),
]
const configFiles = [
  path.join(__dirname, '../cypress.json'),
  path.join(__dirname, '../.env'),
]

configFiles.forEach((configFile, i) => {
  if (!fs.existsSync(configFile)) {
    fs.copyFile(exampleFiles[i], configFile, err => {
      if (err) {
        throw err
      }

      console.log(`${configFile} copied`)
    })
  }
})

console.log('setup - files copied')