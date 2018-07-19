'use strict';
module.exports = function(app) {
  var actions = require('../controllers/actionsController');

  // actions Routes
  app.route('/check')
    .post(actions.check_web_accessibility);
};