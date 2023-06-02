var bbox2extent = require('..')
var extent2bbox = bbox2extent.reverse
var test = require('tape')
var bboxNull = [0, 0, 0, 0]
var extentNull = {
  xmin: 0,
  ymin: 0,
  xmax: 0,
  ymax: 0,
  spatialReference: {
    wkid: 4326,
    latestWkid: 4326
  }
}
var bboxPortlandParks = [-122.87585280244608, 45.39555387844955, -122.37527608962372, 45.65042567778668]
var extentPortlandParks = {
  xmin: -122.87585280244608,
  ymin: 45.39555387844955,
  xmax: -122.37527608962372,
  ymax: 45.65042567778668,
  spatialReference: {
    wkid: 4326,
    latestWkid: 4326
  }
}

test('bbox2extent: null island', function (t) {
  t.deepEqual(bbox2extent(bboxNull), extentNull)
  t.end()
})

test('bbox2extent: portland parks', function (t) {
  t.deepEqual(bbox2extent(bboxPortlandParks), extentPortlandParks)
  t.end()
})

test('bbox2extent: invalid bbox array error', function (t) {
  bbox2extent(extentPortlandParks, function (err, extent) {
    t.ok(err instanceof Error, 'returns a valid error object')
    t.equal(err.message, 'invalid bbox array', 'returns correct error message')
    t.notOk(extent, 'does not return extent')
    t.end()
  })
})

test('extent2bbox: null island', function (t) {
  t.deepEqual(extent2bbox(extentNull), bboxNull)
  t.end()
})

test('extent2bbox: portland parks', function (t) {
  t.deepEqual(extent2bbox(extentPortlandParks), bboxPortlandParks)
  t.end()
})

test('extent2bbox: invalid extent object error', function (t) {
  extent2bbox(bboxPortlandParks, function (err, extent) {
    t.ok(err instanceof Error, 'returns a valid error object')
    t.equal(err.message, 'invalid extent object', 'returns correct error message')
    t.notOk(extent, 'does not return extent')
    t.end()
  })
})
