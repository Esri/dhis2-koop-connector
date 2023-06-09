module.exports = (input) => {
    return {
        type: 'FeatureCollection',
        features: input.map((row, i) => {
            return {
                type: 'Feature',
                properties: {
                    "id": i + 1,
                    "name": row.na,
                    "admin": row.pn
                },
                geometry: {
                    type: 'Point',
                    coordinates: JSON.parse(row.co)
                  }
            }
        })
    };
};