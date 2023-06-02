# bbox2extent

> Transform a GeoJSON bounding box into an Esri-formatted extent object.

[![](https://img.shields.io/npm/v/bbox2extent.svg?style=flat-square)](https://www.npmjs.com/package/bbox2extent)
[![](https://img.shields.io/travis/koopjs/bbox2extent.svg?style=flat-square)](https://travis-ci.org/koopjs/bbox2extent)

## Install

```
npm install bbox2extent
```

## Usage

```js
var bbox2extent = require('bbox2exent')
var bbox = [100, 0, 105, 1]

var extent = bbox2extent(bbox)
// {
//   xmin: 100,
//   ymin: 0,
//   xmax: 105,
//   ymax: 1,
//   spatialReference: {
//     wkid: 4326,
//     latestWkid: 4326
//   }
// }

// -- OR --

bbox2extent(bbox, function (err, extent) {
  if (err) throw err

  console.log(extent)
  // {
  //   xmin: 100,
  //   ymin: 0,
  //   xmax: 105,
  //   ymax: 1,
  //   spatialReference: {
  //     wkid: 4326,
  //     latestWkid: 4326
  //   }
  // }
})
```

Also supports reverse operation (converting an extent to a bounding box) via `reverse`:

```js
var extent2bbox = require('bbox2extent').reverse
var extent = {
  xmin: -108.9395,
  ymin: 37.084968,
  xmax: -102,
  ymax: 40.8877,
  spatialReference: {
    wkid: 4326,
    latestWkid: 4326
  }
}

var bbox = extent2bbox(extent)
// [ -108.9395, 37.084968, -102, 40.8877 ]

// -- OR --

extent2bbox(extent, function (err, bbox) {
  if (err) throw err

  console.log(bbox)
  // [ -108.9395, 37.084968, -102, 40.8877 ]
})
```

## Contributing

`bbox2extent` is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

## License

[ISC](LICENSE)
