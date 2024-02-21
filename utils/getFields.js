function dhis2ToArcGISFieldType(dhis2Type) {
  switch (dhis2Type) {
    case "TEXT":
      return "String";
    case "NUMBER":
      return "Double";
    case "INTEGER":
      return "Integer";
    case "DATE":
      return "Date";
    default:
      return "esriFieldTypeString";
  }
}

module.exports = (headers, overrides) => {
  let geometryColumnIndex = null;

  let basePropsConfig = headers.reduce((acc, header, i) => {
    if (header.name === "geometry") {
      geometryColumnIndex = i;
    }

    if (overrides[header.name]) {
      acc[i] = {
        name: overrides[header.name].name,
        alias: overrides[header.name].alias,
        type: dhis2ToArcGISFieldType(overrides[header.name].type),
      };
    } else {
      acc[i] = {
        name: header.name,
        alias: header.column,
        type: dhis2ToArcGISFieldType(header.valueType),
      };
    }
    return acc;
  }, {});

  return { basePropsConfig, geometryColumnIndex };
};
