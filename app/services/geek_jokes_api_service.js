const { buildConfig, request } = require('../helpers/http-client');

const base_api_url = process.env.BASE_API_URL_GEEK_JOKES;

const options = buildConfig({
  host: base_api_url,
  endpoint: 'api',
  params: { format: 'json' }
});

exports.geekJokesApi = request(options);
