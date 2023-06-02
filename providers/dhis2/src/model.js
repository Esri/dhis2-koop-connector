const config = require('../config/default.json')
const apiKey = config.dhis2.apiKey;
let geojson = null;

function Model(koop) { }

// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson

Model.prototype.getData = function (req, callback) {
  async function fetchData(url) {
    try {
      const response = await fetch(url, {
        "headers": {
          "Authorization": apiKey,
        },
        "method": "GET"
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json(); // Parse the response as JSON
      return data; // Return the JSON data
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  try {
    console.log("Parms", req.params)
    const { host, id } = req.params;

    //Provide the routes into the data
    let url = `https://dhis2-dev.aws.esri-ps.com/api/39/organisationUnits.geojson?level=${host}`
    let dimUrl = `https://dhis2-dev.aws.esri-ps.com/api/39/analytics.json?dimension=dx:${id}&dimension=ou:LEVEL-${host}&filter=pe:LAST_12_MONTHS&displayProperty=NAME&skipData=false&skipMeta=true`
    
    console.log(url,dimUrl, apiKey)
    fetch(url, {
      "headers": {
        "Authorization": apiKey,
      },
      "method": "GET"
    }).then(async response => {
      if (response.status == 200) {
        geojson = response.json()
        geojson.metadata = { name: [host, '_in_', id].join('') }
        console.log(geojson)

        // Calling the async function and using the returned JSON
        const jsonData = await fetchData(dimUrl);
        console.log(jsonData); // Process the JSON data as needed

        callback(null, geojson);
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