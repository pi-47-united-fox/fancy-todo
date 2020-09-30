"use strict";

const getPicture = (gender) => {
	if (!gender || (gender !== "male" && gender !== "female")) {
		gender = "gridy";
	}
	const seed = Math.floor(Math.random() * 200000) + 12345;
	return `https://avatars.dicebear.com/api/${gender}/${seed}.svg`;
};

module.exports = getPicture;
