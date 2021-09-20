const { geekJokesApi } = require('../../../services/geek_jokes_api_service');

exports.weetController = {
  get: (_, res) => geekJokesApi.then(joke => res.status(200).json({ weet: joke }))
};
