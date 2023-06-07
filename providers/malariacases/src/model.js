const config = require('../config/default.json')
const apiKey = config.dhis2.apiKey;
let geojson = null;
const fetch = require('node-fetch')

function Model(koop) { }
// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson
Model.prototype.getData = function (req, callback) {
  function convertToGeoJSON(input) {
    console.log(input)
    // define the basic structure of your GeoJSON
    let geojson = {
      "type": "FeatureCollection",
      "features": []
    };

    // iterate over your rows
    for (let row of input.rows) {
      // create a feature for each row
      let feature = {
        "type": "Feature",
        "geometry": JSON.parse(row[8]),
        "properties": {
          "name": row[10],  // assuming the 11th element is the name
          "oucode": row[11],  // assuming the 12th element is the oucode
          "programstatus": row[12],  // assuming the 13th element is the programstatus
          "eventstatus": row[13],  // assuming the 14th element is the eventstatus
        }
      };

      // add the feature to your GeoJSON
      geojson.features.push(feature);
    }

    return geojson;
  }

  try {
    console.log("Parms", req.params)
    const { host, id } = req.params;

    //Provide the routes into the data
    let url = "http://dhis2-dev.aws.esri-ps.com/api/39/analytics/events/query/VBqh0ynB2wv.json?dimension=ou:ImspTQPwCqd&stage=pTo4uMt3xur&coordinatesOnly=true&startDate=2022-10-11T00%3A00%3A00.000&endDate=2023-10-11T00%3A00%3A00.000&pageSize=1000"
    //let url = `https://dhis2-dev.aws.esri-ps.com/api/39/organisationUnits.geojson?level=${host}`
    //let dimUrl = `https://dhis2-dev.aws.esri-ps.com/api/39/analytics.json?dimension=dx:${id}&dimension=ou:LEVEL-${host}&filter=pe:LAST_12_MONTHS&displayProperty=NAME&skipData=false&skipMeta=true`

    fetch(url, {
      "headers": {
        "Authorization": apiKey,
      },
      "method": "GET"
    }).then(response => {
      if (response.status == 200) {
        geojson = response.json().then(data => {
          // Now you can use your data
          let output = convertToGeoJSON(data)
          //output.metadata = { name: [host, '_in_', id].join('') }
          console.log(output)
          callback(null, output);
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

  } catch (error) {
    console.log(error)
  }
}

module.exports = Model
