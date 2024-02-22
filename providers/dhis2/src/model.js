/* Copyright 2023 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// const config = require("../../../config/default.json");
const parseGeoJSON = require("./parseGeoJson");
require("dotenv").config();

const apiKey = process.env.DHIS2_TOKEN;

let geojson = null;
const fetch = require("node-fetch");

function Model(koop) {}

// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson

Model.prototype.getData = function (req, callback) {
  try {
    const { host, id } = req.params;
    let url = `${process.env.DHIS2_SERVER}/geoFeatures.geojson?ou=ou%3ALEVEL-3%3BImspTQPwCqd&displayProperty=NAME`;
    let dimUrl = `${process.env.DHIS2_SERVER}/analytics.json?dimension=dx:Tt5TAvdfdVK&dimension=ou:ImspTQPwCqd;LEVEL-3&filter=pe:LAST_12_MONTHS&displayProperty=NAME&skipData=false&skipMeta=true`;

    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            let geoData = data;
            console.log(data[0]);

            fetch(dimUrl, {
              headers: {
                Authorization: apiKey,
              },
              method: "GET",
            }).then((dimResponse) => {
              dimResponse.json().then((dimData) => {
                geoData.map((row, i) => {
                  dimData.rows.map((dimRow, i) => {
                    if (row.id == dimRow[1]) row.value = parseInt(dimRow[2]);
                  });
                });

                geojson = parseGeoJSON(geoData);
                geojson.metadata = {
                  geometryType: "Polygon",
                  idField: "id",
                  name: "ANCCoverage",
                };
                geojson.ttl = 3600;
                console.log(geojson);
                callback(null, geojson);
              });
            });
          });
        } else {
          console.log(response.status);
          callback({ error: "Error" });
        }
      })
      .catch((e) => {
        let geoData = local;
        let dimData = localDim;
        geoData.map((row, i) => {
          dimData.rows.map((dimRow, i) => {
            if (row.id == dimRow[1]) row.value = parseInt(dimRow[2]);
          });
        });
        geojson = parseGeoJSON(geoData);
        geojson.metadata = {
          geometryType: "Polygon",
          idField: "id",
          name: "ANCCoverage",
        };
        geojson.ttl = 3600;
        console.log(geojson);
        callback(null, geojson);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = Model;
