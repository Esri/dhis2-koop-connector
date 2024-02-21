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
const config = require("../../../config/default.json");
const parseGeoJSON = require("./parseGeoJson");
const apiKey = config.dhis2.apiKey;
let geojson = null;
const fetch = require("node-fetch");
function Model(koop) {}

// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson
Model.prototype.getData = function (req, callback) {
  let url = `${config.dhis2.serverURL}/39/geoFeatures.json?includeGroupSets=false&ou=ou%3AImspTQPwCqd%3BLEVEL-m9lBJogzE95&displayProperty=NAME`;
  fetch(url, {
    headers: {
      Authorization: apiKey,
    },
    method: "GET",
  })
    .then((response) => {
      if (response.status == 200) {
        response
          .json()
          .then((data) => {
            console.log(data[0]);
            let baseFields = [
              {
                name: "id",
                alias: "Organisation unit / geo feature identifier",
                type: "String",
              },
              {
                name: "na",
                alias: "Organisation unit / geo feature name",
                type: "String",
              },
              {
                name: "hcd",
                alias:
                  "Has coordinates down, indicating whether one or more children organisation units exist with coordinates (below in the hierarchy)",
                type: "String",
              },
              {
                name: "hcu",
                alias:
                  "Has coordinates up, indicating whether the parent organisation unit has coordinates (above in the hierarchy)",
                type: "String",
              },
              {
                name: "le",
                alias: "Level of this organisation unit / geo feature.",
                type: "String",
              },
              {
                name: "pg",
                alias:
                  "Parent graph, the graph of parent organisation unit identifiers up to the root in the hierarchy",
                type: "String",
              },
              {
                name: "pi",
                alias:
                  "Parent identifier, the identifier of the parent of this organisation unit",
                type: "String",
              },
              {
                name: "pn",
                alias:
                  "Parent name, the name of the parent of this organisation unit",
                type: "String",
              },
              {
                name: "ty",
                alias:
                  "Geo feature type, 1 = point and 2 = polygon or multi-polygon",
                type: "String",
              },
              {
                name: "co",
                alias: "Coordinates of this geo feature",
                type: "String",
              },
            ];

            let geoData = data;

            geojson = parseGeoJSON(geoData, baseFields);

            geojson.metadata = {
              geometryType: "Point",
              idField: "id",
              name: "Facilities",
              fields: baseFields,
            };
            geojson.ttl = 3600;
            console.log(geojson);
            callback(null, geojson);
          })
          .catch((error) => {
            console.error(
              "There has been a problem with your fetch operation:",
              error
            );
            callback({ error: "Error" });
          });
      } else {
        geojson = parseGeoJSON(local);
        geojson.metadata = {
          geometryType: "Point",
          idField: "id",
          name: "Facilities",
        };
        geojson.ttl = 3600;
        console.log(geojson);
        callback(null, geojson);
      }
    })
    .catch((e) => {
      console.log("error in fetch", e);
      callback(e);
    });
};

module.exports = Model;
