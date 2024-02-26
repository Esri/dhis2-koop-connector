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
module.exports = (input, fieldInfo) => {
  return {
    type: "FeatureCollection",
    features: input.rows.map((row, i) => {
      const fieldProperties = row.reduce((acc, value, i) => {
        if (
          fieldInfo.geometryColumnIndex &&
          i === fieldInfo.geometryColumnIndex
        ) {
          return acc;
        }
        const fieldConfig = fieldInfo.basePropsConfig[i];
        if (fieldConfig.type === "INTEGER") {
          value = parseInt(value);
        }

        if (fieldConfig.type === "TEXT") {
          value = value ? value.toString() : '';
        }

        acc[fieldInfo.basePropsConfig[i].name] = value;
        return acc;
      }, {});

      return {
        type: "Feature",
        properties: {
          id: i + 1,
          ...fieldProperties,
        },
        geometry: JSON.parse(row[fieldInfo.geometryColumnIndex]),
      };
      //   return {
      //     type: "Feature",
      //     properties: {
      //       id: i + 1,
      //       admin: row[11],
      //       casedate: row[2],
      //       gender: row[17],
      //       status: row[13],
      //       age: parseInt(row[18]),
      //     },
      //     geometry: JSON.parse(row[8]),
      //   };
    }),
  };
};
