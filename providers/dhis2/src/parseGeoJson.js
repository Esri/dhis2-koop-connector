module.exports = (input) => {
    return {
        type: 'FeatureCollection',
        features: input.map((row, i) => {
            return {
                type: 'Feature',
                properties: {
                    "id": i + 1,
                    "code": row.code,
                    "admin1": row.pn,
                    "admin2": row.na,
                    "anc_value": row.value
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: JSON.parse(row.co)
                  }
            }
        })
    };
};