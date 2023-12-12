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
const fetch = require("node-fetch");

function Model(koop) {}
// A Model is a javascript function that encapsulates custom data access code.
// Each model should have a getData() function to fetch the geo data
// and format it into a geojson
Model.prototype.getData = function (req, callback) {
  try {
    console.log("Params", req.query);
    const { host, id } = req.params;
    let url = `${config.dhis2.serverURL}/analytics/events/query/VBqh0ynB2wv.json?dimension=ou:ImspTQPwCqd&dimension=F3ogKBuviRA&dimension=${id}&dimension=${host}&filter=pe:LAST_MONTH&stage=pTo4uMt3xur&coordinatesOnly=true&coordinateField=F3ogKBuviRA&eventStatus=ACTIVE&pageSize=110000`;
    console.log("URL", url);
    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
      method: "GET",
    })
      .then((response) => {
        console.log("Response", response.status);
        if (response.status == 200) {
          response
            .json()
            .then((data) => {
              geojson = parseGeoJSON(data);
              geojson.metadata = {
                geometryType: "Point",
                idField: "id",
                name: "MalariaCase",
              };
              geojson.ttl = 3600;
              if (
                req.query.hasOwnProperty("returnCountOnly") &&
                req.query.returnCountOnly
              ){
                console.log("Count", geojson.features.length);
                callback(null, { count: geojson.features.length });
              }
              else {
                console.log("Features", geojson.features);
                callback(null, geojson);
              }
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
            name: "MalariaCase",
          };
          geojson.ttl = 36000;
          if (
            req.query.hasOwnProperty("returnCountOnly") &&
            req.query.returnCountOnly
          )
            callback(null, { count: geojson.features.length });
          else callback(null, geojson);
        }
      })
      .catch((e) => {
        console.log("error in fetch", e);
        callback(e);
      });
  } catch (error) {
    console.log("Error Finale", error);
  }
};

module.exports = Model;
