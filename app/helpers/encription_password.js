const bcrypt = require('bcryptjs');

exports.encriptionPassword = password => bcrypt.hashSync(password, 10);
