module.exports = (input) => {
    return {
        type: 'FeatureCollection',
        features: input.rows.map((row, i) => {
            return {
                type: 'Feature',
                properties: {
                    "id": i + 1,
                    "admin": row[11],
                    "casedate": row[2],
                    "gender": row[16],
                    "status": row[13],
                    "age": parseInt(row[17])
                },
                geometry: JSON.parse(row[8])
            }
        })
    };
};