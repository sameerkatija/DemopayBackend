const applyCorsMiddleware = require("./cors.middleware");

module.exports = function (app, express) {
  applyCorsMiddleware(app);
  app.use(express.json());
  //   app.use(express.urlencoded({ extended: true }));
  return app;
};
