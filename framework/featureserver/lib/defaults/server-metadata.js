const serviceResponseDefaults = {
  serviceDescription: 'This is a feature service powered by custom data runtime. Service Description information may not be available for all services.',
  hasVersionedData: false,
  supportsDisconnectedEditing: false,
  supportsRelationshipsResource: false,
  supportedQueryFormats: 'JSON',
  maxRecordCount: 2000,
  hasStaticData: false,
  capabilities: 'Query',
  description: 'This is a feature service powered by custom data runtime. Service Description information may not be available for all services.',
  copyrightText: 'Copyright information varies from provider to provider, for more information please contact the data provider source.',
  spatialReference: {
    wkid: 4326,
    latestWkid: 4326
  },
  initialExtent: {
    xmin: -180,
    ymin: -90,
    xmax: 180,
    ymax: 90,
    spatialReference: {
      wkid: 4326,
      latestWkid: 4326
    }
  },
  fullExtent: {
    xmin: -180,
    ymin: -90,
    xmax: 180,
    ymax: 90,
    spatialReference: {
      wkid: 4326,
      latestWkid: 4326
    }
  },
  allowGeometryUpdates: false,
  units: 'esriDecimalDegrees',
  syncEnabled: false,
  layers: [],
  tables: []
}

module.exports = serviceResponseDefaults
