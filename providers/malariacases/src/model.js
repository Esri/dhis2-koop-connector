const config = require('../config/default.json')
const apiKey = config.dhis2.apiKey;
let geojson = null;
const fetch = require('node-fetch')

function Model(koop) { }
// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson
Model.prototype.getData = function (req, callback) {
  function convertToGeoJSON(input, start, end) {
    console.log(input, start, end)
    // define the basic structure of your GeoJSON
    let geojson = {
      "type": "FeatureCollection",
      "features": []
    };

    let processRows = input.rows //.slice(start, start + end)

    console.log(processRows[0])
    // iterate over your rows
    for (let [index, row] of processRows.entries()) {

      // create a feature for each row
      let feature = {
        "type": "Feature",
        "geometry": JSON.parse(row[8]),
        "properties": {
          "id":index,
          "admin": row[11],  // assuming the 12th element is the oucode
          "casedate": row[2],
          "gender": row[16],  // assuming the 14th element is the eventstatus
          "status": row[13],  // assuming the 14th element is the eventstatus
          "age": parseInt(row[17])
        }
      };

      // add the feature to your GeoJSON
      geojson.features.push(feature);
    }

    return geojson;
  }

  try {
    console.log("Parms", req.query)
    const { host, id } = req.params;

    let offset = 0
    let recordcount = 2000
    if (req.query.hasOwnProperty('resultOffset'))
      offset = parseInt(req.query.resultOffset)

    let url = `http://dhis2-dev.aws.esri-ps.com/api/39/analytics/events/query/VBqh0ynB2wv.json?dimension=ou:bL4ooGhyHRQ&dimension=${id}&dimension=${host}&filter=pe:LAST_5_YEARS&coordinatesOnly=true&pageSize=100000`

    if (req.query.hasOwnProperty('resultRecordCount'))
      recordcount = req.query.resultRecordCount

    if (req.query.hasOwnProperty('returnCountOnly') && req.query.returnCountOnly)
      url = `http://dhis2-dev.aws.esri-ps.com/api/39/analytics/events/query/VBqh0ynB2wv.json?dimension=ou:bL4ooGhyHRQ&dimension=${id}&dimension=${host}&filter=pe:LAST_5_YEARS&outputType=EVENT&coordinatesOnly=true&pageSize=100000`


    fetch(url, {
      "headers": {
        "Authorization": apiKey,
      },
      "method": "GET"
    }).then(response => {
      if (response.status == 200) {
        geojson = response.json().then(data => {
          // Now you can use your data
          if (req.query.hasOwnProperty('returnCountOnly') && req.query.returnCountOnly) {
            let output = { "count": data.rows.length }
            callback(null, output);
          } else {
            let output = convertToGeoJSON(data, offset, recordcount)
            output.metadata = { 'geometryType': 'Point', 'idField': 'id' }
            callback(null, output);
          }
        })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
      } else {
        console.log(response.status)
        callback({ "error": "Error" })
      }
    }).catch(e => {
      console.log("error in fetch", e)
      callback(e);
    });

    console.log("do this same time?")

  } catch (error) {
    console.log(error)
  }
}

module.exports = Model
