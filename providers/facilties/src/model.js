const config = require('../config/default.json')
const parseGeoJSON = require('./parseGeoJson');
const apiKey = config.dhis2.apiKey;
let geojson = null;
const fetch = require('node-fetch')
function Model (koop) {}

// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson
Model.prototype.getData = function (req, callback) {
  let url = 'http://dhis2-dev.aws.esri-ps.com/api/39/geoFeatures.json?includeGroupSets=false&ou=ou%3AImspTQPwCqd%3BLEVEL-m9lBJogzE95&displayProperty=NAME'
  let dimURL = 'http://dhis2-dev.aws.esri-ps.com/api/39/organisationUnitProfile/FLjwMPWLrL2/data?period=2023'
  fetch(url, {
    "headers": {
      "Authorization": apiKey,
    },
    "method": "GET"
  }).then(response => {
    if (response.status == 200) {
      response.json().then(data => {
        console.log(data[0])
        let geoData = data

        geojson = parseGeoJSON(geoData)
        geojson.metadata = { 'geometryType': 'Point', 'idField': 'id', "name": "Facilities" }
        geojson.ttl = 3600
        console.log(geojson)
        callback(null, geojson);
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
}

module.exports = Model
