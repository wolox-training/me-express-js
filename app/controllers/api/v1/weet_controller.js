const { geekJokesApi } = require('../../../services/geek_jokes_api_service');

exports.weetController = {
  get: (_, res) =>
    geekJokesApi
      .response()
      .then(joke => res.status(200).json({ weet: joke }))
      .catch(err => res.status(err.status).json({ error: err }))
};
