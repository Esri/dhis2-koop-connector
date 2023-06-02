module.exports = bbox2extent

function bbox2extent (bbox, callback) {
  var isArray = Object.prototype.toString.call(bbox) === '[object Array]'
  var isValid = bbox.length === 4

  if (!isArray || !isValid) {
    var err = new Error('invalid bbox array')
    if (callback) return callback(err)
    else return console.error(err)
  }

  var extent = {
    xmin: bbox[0],
    ymin: bbox[1],
    xmax: bbox[2],
    ymax: bbox[3],
    spatialReference: {
      wkid: 4326,
      latestWkid: 4326
    }
  }

  if (callback) return callback(null, extent)
  else return extent
}

function extent2bbox (extent, callback) {
  var isObject = Object.prototype.toString.call(extent) === '[object Object]'
  var isValid = extent.xmin !== undefined &&
    extent.ymin !== undefined &&
    extent.xmax !== undefined &&
    extent.ymax !== undefined

  if (!isObject || !isValid) {
    var err = new Error('invalid extent object')
    if (callback) return callback(err)
    else return console.error(err)
  }

  var bbox = [extent.xmin, extent.ymin, extent.xmax, extent.ymax]

  if (callback) return callback(null, bbox)
  else return bbox
}

bbox2extent.reverse = extent2bbox
