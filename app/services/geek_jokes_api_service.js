const axios = require('axios');

const base_api_url = `${process.env.BASE_API_URL_GEEK_JOKES}/api?format=json`;

exports.geekJokesApi = {
  response: () =>
    axios
      .get(base_api_url)
      .then(res => res.data.joke)
      .catch(err => err)
};
