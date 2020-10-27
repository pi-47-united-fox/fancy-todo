const axios = require("axios")
const { Todo } = require("../models/index")
const Helper = require("../helpers/helper")
const { static } = require("express")


class GuardianController {
    static addTaskRewriteArticle(req, res, next) {
            const query = req.query.search
            axios.get(`https://content.guardianapis.com/search?order-by=newest&q=${query}&api-key=1e9a11a5-8acc-4c99-ace2-1ae53eb18e0e`)
            .then(({ data })=>{
                res.status(200).json(data)
                console.log(data.response.results)
                let article = data.response.results[0]
                let newTodoWrite = {
                    title: `[WRITING TASK] ${ Helper.shrinkTitle(article.webTitle) }`,
                    description: `Tulis ulang dan terjemahkan artikel pada link berikut ini: \n ${article.webUrl}`,
                    due_date: Helper.setDueDate(new Date(), 3),
                    UserId: req.userData.id
                }
                console.log(newTodoWrite)
                return Todo.create(newTodoWrite)
            })
            .then(() => {
                res.status(201).json({
                    name: "Writing Task Success",
                    message: "New task for writing task has been successfully created"
                })
            }) 
            .catch(err=>{
                next(err)
            })
    }

}

module.exports = GuardianController