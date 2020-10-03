const bcrypt = require("bcrypt")

function encryptPassword(pass){ 
    const saltRounds = 10;
    return bcrypt.hashSync(pass, saltRounds);
}

function checkPassword(pass, hash){
    return bcrypt.compareSync(pass, hash);
}

module.exports = {checkPassword, encryptPassword}