const fs = require('fs')
const config = require('config')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const pathModule = require('path')
const _ = require('highland')

function Filesystem (options) {
  options = options || {}
  try {
    this.rootDir = options.rootDir || config.filesystem.local.rootDir
  } catch (e) {
    this.rootDir = process.cwd()
    console.warn('No root directory was specified, defaulting to: ', this.rootDir)
  }
}

Filesystem.prototype.stat = function (path, callback) {
  path = this.realpathSync(path)
  fs.stat(path, callback)
}

Filesystem.prototype.createReadStream = function (path, options) {
  path = this.realpathSync(path)
  return fs.createReadStream(path, options)
}

Filesystem.prototype.createWriteStream = function (path, options) {
  path = this.realpathSync(path)
  mkdirp.sync(pathModule.dirname(path))
  const input = _()
  input.abort = function () {
    input.destroy()
    fs.unlink(path, function () {})
  }

  input.end = function (chunk) {
    if (chunk) input.write(chunk)
    input.write(_.nil)
  }

  input
  .pipe(fs.createWriteStream(path))
  .on('error', function (e) { input.emit('error', e) })
  .on('finish', function () { input.emit('finish') })
  return input
}

Filesystem.prototype.writeFile = function (path, data, callback) {
  path = this.realpathSync(path)
  fs.writeFile(path, data, callback)
}

Filesystem.prototype.readFile = function (path, callback) {
  path = this.realpathSync(path)
  fs.readFile(path, callback)
}

Filesystem.prototype.unlink = function (path, callback) {
  path = this.realpathSync(path)
  fs.unlink(path, callback)
}

Filesystem.prototype.mkdir = function (path, callback) {
  path = this.realpathSync(path)
  mkdirp(path, callback)
}

Filesystem.prototype.rmdir = function (path, callback) {
  path = this.realpathSync(path)
  fs.rmdir(path, callback)
}

Filesystem.prototype.rmdirp = function (path, callback) {
  path = this.realpathSync(path)
  rimraf(path, callback)
}

Filesystem.prototype.realpathSync = function (path) {
  return pathModule.join(this.rootDir, path)
}

Filesystem.name = 'local'
Filesystem.type = 'filesystem'
Filesystem.plugin_name = 'localfs'
Filesystem.version = require('./package.json').version

module.exports = Filesystem