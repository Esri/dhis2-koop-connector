

const config = require('../config/default.json')
const parseGeoJSON = require('./parseGeoJson');
const apiKey = config.dhis2.apiKey;
let dhisFeatures = null;
const fetch = require('node-fetch')

function Model(koop) { }
// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson
Model.prototype.getData = function (req, callback) {
  try {
    console.log("Parms", req.query)
    const { host, id } = req.params;

    let offset = 0
    let recordcount = 2000

    if (req.query.hasOwnProperty('resultOffset'))
      offset = parseInt(req.query.resultOffset)

    if (req.query.hasOwnProperty('resultRecordCount'))
      recordcount = req.query.resultRecordCount

    let pageSize = 100000

    //http://dhis2-dev.aws.esri-ps.com/api/39/analytics/events/query/VBqh0ynB2wv.json?dimension=ou:ImspTQPwCqd&stage=pTo4uMt3xur&coordinatesOnly=true&startDate=2022-01-01T01%3A00%3A00.000&endDate=2023-10-01T02%3A00%3A00.000&pageSize=100000
    let url = `http://dhis2-dev.aws.esri-ps.com/api/39/analytics/events/query/VBqh0ynB2wv.json?dimension=ou:ImspTQPwCqd&dimension=${id}&dimension=${host}&filter=pe:LAST_5_YEARS&coordinatesOnly=true&pageSize=${pageSize}`

    //if (req.query.hasOwnProperty('returnCountOnly') && req.query.returnCountOnly)
    //  url = `http://dhis2-dev.aws.esri-ps.com/api/39/analytics/events/count/VBqh0ynB2wv.json?dimension=ou:ImspTQPwCqd&dimension=${id}&dimension=${host}&filter=pe:LAST_5_YEARS`

    fetch(url, {
      "headers": {
        "Authorization": apiKey,
      },
      "method": "GET"
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          geojson = parseGeoJSON(data)
          geojson.metadata = { 'geometryType': 'Point', 'idField': 'id', "name": "MalariaCase" }
          geojson.ttl = 60
          if (req.query.hasOwnProperty('returnCountOnly'))
            callback(null, { 'count': geojson.features.length })
          else
            callback(null, geojson)
          //}
        }).catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
          callback({ "error": "Error" })
        });
      } else {
        console.log(response.status)
        callback({ "error": "Error" })
      }
    }).catch(e => {
      console.log("error in fetch", e)
      callback(e);
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports = Model
