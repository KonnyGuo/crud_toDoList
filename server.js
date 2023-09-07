//variables
const express = require('express')
const app = express()
const Mongoose = require('mongoose')
require('dotenv').config()
const PORT = 8000
//model variable
const toDoTask = require('./model/toDoTask')
//middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//model variables
const connectDB = async() => {
    try {
        const connect = await Mongoose.connect(process.env.connectStrDoTask)
        console.log("connected to db")
    } catch (err){
        console.error(err)
    }

}

connectDB()

app.get("/", async(req, res) =>{
    try{
        const tasks = await toDoTask.find({})
        res.render("index.ejs", {ejsTasks:tasks})
    } catch(err) {
        res.status(401).send(err)
    }
})

app.post("/", async(req, res) => {
    const task = new toDoTask ({
        title: req.body.title,
        content: req.body.content
    })

    try {
        await task.save()
        console.log(task)
        res.redirect("/")
    } catch (err) {
        res.status(401).json({
            error: err.message
        })
    }
})

app
    .route("/edit/:id")
    .get(async(req, res) => {
        const id = req.params.id
        try {
            const task = await toDoTask.find({})
            res.render("edit.ejs", {ejsTasks: task, ejsID: id})
        } catch (err) {
            res.status(401).json({
                error: err.message
            })
        }
    })
    .post(async(req, res) => {
        const id = req.params.id
        if(req.body.confirm === "confirmVal") {
            const updateTask = await toDoTask.findByIdAndUpdate(id, {title: req.body.title, content: req.body.content})
            if(!updateTask){
                res.status(401).json({
                    message: "error has occured in update"
                })
            }
        }

        res.redirect("/")

    })
 

app
    .route("/remove/:id")
    .get(async(req, res) => {
        const id = req.params.id
            const deleteTask = await toDoTask.findByIdAndDelete(id, {title: req.body.title, content: req.body.content})
            if(!deleteTask){
                res.status(401).json({
                    message: "error has occured in update"
                })
            }

        res.redirect("/")
    })


app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})