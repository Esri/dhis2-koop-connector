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
function handleRequest(req, res) {
  // Define your list data
  // Get the host variable from the request
  const host = req.headers.host;
  const items = [
    "malariacases/rest/services/qrur9Dvnyt5/oZg33kd9taw/FeatureServer/0",
    "dhis2/rest/services/qrur9Dvnyt5/oZg33kd9taw/FeatureServer/0",
    "facilities/rest/services/qrur9Dvnyt5/oZg33kd9taw/FeatureServer/0",
  ];

  let response = "<html><head><title>DHIS Connections</title></head><body>";
  response += "<h1>Services</h1>";
  response += "<ul>";
  items.forEach((item) => {
    response += `<li><a href='https://${host}/${item}'>${host}/${item}</a></li>`;
  });
  response += "</ul>";
  response += "</body></html>";

  res.status(200).send(response);
}

module.exports = handleRequest;
