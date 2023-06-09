function handleRequest (req, res) {
  // Define your list data
    // Get the host variable from the request
    const host = req.headers.host;
  const items = ['malariacases/rest/services/qrur9Dvnyt5/oZg33kd9taw/FeatureServer/0', 'dhis2/rest/services/qrur9Dvnyt5/oZg33kd9taw/FeatureServer/0', 'facilities/rest/services/qrur9Dvnyt5/oZg33kd9taw/FeatureServer/0'];

  let response = '<html><head><title>DHIS Connections</title></head><body>';
  response += '<h1>Services</h1>';
  response += '<ul>';
  items.forEach((item) => {
    response += `<li><a href='https://${host}/${item}'>${host}/${item}</a></li>`;
  });
  response += '</ul>';
  response += '</body></html>';
  
  res.status(200).send(response)
}

module.exports = handleRequest
