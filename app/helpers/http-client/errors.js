const { databaseError } = require('../../errors');

exports.httpRequestClientErrorHandler = error => databaseError(error);
