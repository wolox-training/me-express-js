// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { weetController } = require('./controllers/api/v1/weet_controller');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/api/v1/weet', weetController.get);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
