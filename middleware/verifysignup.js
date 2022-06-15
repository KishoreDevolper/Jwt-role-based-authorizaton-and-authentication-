

const User = require('../db/models/user')

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // name
  User.query().findOne({
    
      name: req.body.name
    
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    // Email
    User.query().findOne({
      
        email: req.body.email
      
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  };

module.exports = verifySignUp;