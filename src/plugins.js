const klawSync = require('klaw-sync')
const fs = require('fs-extra')
const os = require('os')
// const config = require('config')
const path = require('path')

const outputs = []
const auths = []
const caches = []
const plugins = []

// const portnumber = config.port

const configPath = path.join(__dirname, '../config/default.json')
let config = fs.readJSONSync(configPath)

const portnumber = config.port

fs.writeJSONSync(configPath, { port: +portnumber }, {
  spaces: 2,
  EOL: os.EOL
})

const componentPath = path.join(__dirname, '../providers')
if (fs.ensureDir(componentPath)) {
  const items = klawSync(componentPath, { nofile: true, depthLimit: 0 })

  for (const item of items) {
    const provconfig = fs.readJSONSync(path.join(item.path, 'config/default.json'))
    config = Object.assign(config, provconfig)

    fs.writeJSONSync(configPath, config, {
      spaces: 2,
      EOL: os.EOL
    })
    plugins.push({
      instance: require(item.path)
    })
  }
}
module.exports = [...outputs, ...auths, ...caches, ...plugins]
