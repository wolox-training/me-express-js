const request = require('axios');
const { httpRequestClientErrorHandler } = require('./errors');

exports.buildConfig = ({ method = 'get', host, endpoint, data, headers, params }) => ({
  method,
  url: `${host}/${endpoint}`,
  headers: {
    'content-type': 'application/json',
    ...headers
  },
  data,
  params
});

exports.request = options =>
  request(options)
    .then(res => res.data)
    .catch(error => httpRequestClientErrorHandler(error));
