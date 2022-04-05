const Tutorial = require("./user");
const User = require("./user.js");
// Create and Save a new Tutorial
exports.findOne = async (req, res, user) => {
    //console.log(req)
    User.findById(req, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.Nickname}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.Nickname
          });
        }
      }
      console.log(data)
      user = data
    });
  };
  exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Tutorial
    const user = new User({
      Nickname : req.body.Nickname,
      contraseña : req.body.contraseña,
      puntos : req.body.puntos,
      monedas : req.body.monedas,
      avatar : req.body.avatar,
      piezas : req.body.piezas,
      tablero : req.body.tablero
    });
    console.log(user)
    // Save Tutorial in the database
  User.create(user,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
<<<<<<< HEAD
  };

=======
  };
>>>>>>> 89e7601be789c9179725b920aef4b7b9ff8520b9
