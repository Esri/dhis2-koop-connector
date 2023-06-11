

const config = require('../config/default.json')
const parseGeoJSON = require('./parseGeoJson');
const apiKey = config.dhis2.apiKey;
const fetch = require('node-fetch')

function Model(koop) { }
// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson
Model.prototype.getData = function (req, callback) {
  try {
    console.log("Parms", req.query)
    const { host, id } = req.params;
    let url = `http://dhis2-dev.aws.esri-ps.com/api/39/analytics/events/query/VBqh0ynB2wv.json?dimension=ou:ImspTQPwCqd&dimension=F3ogKBuviRA&dimension=${id}&dimension=${host}&filter=pe:LAST_14_DAYS&stage=pTo4uMt3xur&coordinatesOnly=true&coordinateField=F3ogKBuviRA&eventStatus=ACTIVE&pageSize=110000`

    //let url = `http://dhis2-dev.aws.esri-ps.com/api/39/analytics/events/query/VBqh0ynB2wv.json?dimension=ou:ImspTQPwCqd&dimension=${id}&dimension=${host}&filter=pe:LAST_5_YEARS&coordinatesOnly=true&pageSize=100000`

    fetch(url, {
      "headers": {
        "Authorization": apiKey,
      },
      "method": "GET"
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          console.log(data.rows[0])
          geojson = parseGeoJSON(data)
          console.log(geojson.features[0])
          geojson.metadata = { 'geometryType': 'Point', 'idField': 'id', "name": "MalariaCase" }
          geojson.ttl = 3600
          if (req.query.hasOwnProperty('returnCountOnly') && req.query.returnCountOnly)
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
