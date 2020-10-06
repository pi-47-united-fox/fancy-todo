const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(password, salt);
};

const checkPassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

module.exports = {
	encryptPassword,
	checkPassword,
};
