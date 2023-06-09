const config = require('../config/default.json')
const parseGeoJSON = require('./parseGeoJson');
const apiKey = config.dhis2.apiKey;
let geojson = null;
const fetch = require('node-fetch')

function Model(koop) { }

// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson

Model.prototype.getData = function (req, callback) {
  try {
    const { host, id } = req.params;
    let url = `http://dhis2-dev.aws.esri-ps.com/api/39/geoFeatures.geojson?ou=ou%3ALEVEL-3%3BImspTQPwCqd&displayProperty=NAME`
    let dimUrl = `http://dhis2-dev.aws.esri-ps.com/api/39/analytics.json?dimension=dx:Tt5TAvdfdVK&dimension=ou:ImspTQPwCqd;LEVEL-3&filter=pe:LAST_12_MONTHS&displayProperty=NAME&skipData=false&skipMeta=true`

    fetch(url, {
      "headers": {
        "Authorization": apiKey,
      },
      "method": "GET"
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          let geoData = data
          console.log(data[0])

          fetch(dimUrl, {
            "headers": {
              "Authorization": apiKey,
            },
            "method": "GET"
          }).then(dimResponse => {
            dimResponse.json().then(dimData => {
              geoData.map((row, i) => {
                dimData.rows.map((dimRow, i) => {
                  if (row.id == dimRow[1])
                    row.value = parseInt(dimRow[2])
                })
              })

              geojson = parseGeoJSON(geoData)
              geojson.metadata = { 'geometryType': 'Polygon', 'idField': 'id', "name": "ANCCoverage" }
              geojson.ttl = 3600
              console.log(geojson)
              callback(null, geojson);
            })
          })
        })
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