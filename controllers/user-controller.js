const { User } = require('../models/index')

class UserController {
    static registerPost(req, res) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        // let { email, password } = req.body
        console.log(user);
        User.create(user)
            .then(data => {
                res.send(data)
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json({
                    message: 'errors'
                })
            })
    }
    static loginPost(req, res) {

    }
}

module.exports = UserController