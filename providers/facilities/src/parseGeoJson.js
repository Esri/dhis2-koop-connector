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
    features: input.map((row, i) => {
      const fieldProperties = Object.keys(row).reduce((acc, value, i) => {
        if (value === "dimensions" || value === "id") {
          return acc;
        }

        if (
          fieldInfo.geometryColumnIndex &&
          i === fieldInfo.geometryColumnIndex
        ) {
          return acc;
        }
        const fieldConfig = fieldInfo.find((field) => field.name === value);
        if (!fieldConfig) {
          return acc;
        }
        if (fieldConfig.type === "Integer") {
          value = parseInt(row[value]);
        } else {
          value = row[value].toString();
        }

        acc[fieldConfig.name] = value;
        return acc;
      }, {});

      return {
        type: "Feature",
        properties: {
          id: i + 1,
          ...fieldProperties,
        },
        geometry: { type: "Point", coordinates: JSON.parse(row.co) },
      };
      //   return {
      //     type: "Feature",
      //     properties: {
      //       id: i + 1,
      //       name: row.na,
      //       admin: row.pn,
      //     },
      //     geometry: {
      //       type: "Point",
      //       coordinates: JSON.parse(row.co),
      //     },
      //   };
    }),
  };
};
