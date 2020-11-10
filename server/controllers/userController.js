const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserControllers {
  static home(req, res) {
    res.send(`ini home user`);
  }
  static async register(req, res) {
    const inputRegister = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const data = await User.create(inputRegister);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    const inputLogin = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const user = await User.findOne({
        where: {
          email: inputLogin.email,
        },
      });
      if (!user) {
        res.status(401).json({
          name: "Unauthorized",
          msg: "email or password wrong!",
        });
      } else if (!comparePassword(inputLogin.password, user.password)) {
        res.status(401).json({
          name: "Unauthorized",
          msg: "email or password wrong!",
        });
      } else {
        const access_token = signToken({
          id: user.id,
          username: user.username,
          email: user.email,
        });
        res.status(200).json({ access_token });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static googleLogin(req, res) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = "";
    client
      .verifyIdToken({
        idToken: req.headers.google_access_token,
        audience: process.env.CLIENT_ID,
      })
      .then((ticket) => {
        let payload = ticket.getPayload();
        email = payload["email"];
        return User.findOne({ where: { email } });
      })
      .then((user) => {
        if (!user) {
          var newUser = {
            email: email,
            password: "randompassword",
          };
          return User.create(newUser);
        } else {
          return user;
        }
      })
      .then((user) => {
        const access_token = signToken({ id: user.id, email: user.email });
        return res
          .status(201)
          .json({ id: user.id, email: user.email, access_token });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = UserControllers;
