const applyCorsMiddleware = require("./cors.middleware");

module.exports = function (app) {
  applyCorsMiddleware(app);
  return app;
};
