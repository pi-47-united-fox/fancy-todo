"use strict";

const axios = require("axios");

class jikanController {
	static search(req, res, next) {
		const title = req.body.title;
		axios
			.get(`https://api.jikan.moe/v3/search/manga?q=${title}&limit=12`)
			.then(({ data }) => {
				if (data.results.length) {
					const results = [];
					data.results.forEach((el) => {
						if (el.type === "Manga" && el.score) {
							results.push({
								title: el.title,
								image_url: el.image_url,
								score: el.score,
								synopsis: el.synopsis,
							});
						}
					});
					res.status(200).json(results);
				} else {
					next({ name: "DataNotFound" });
				}
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = jikanController;
