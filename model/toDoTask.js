const Mongoose = require('mongoose')

const toDoSchema = new Mongoose.Schema({
    title: {
        type : String,
        require: true
    },

    content: {
        type: String,
        require:true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

// creates a Mongoose model named "toDoTask" based on the "toDoSchema" schema, and it specifies that documents created or queried using this model should be stored in the "do" collection in the database. This model can then be used to perform CRUD (Create, Read, Update, Delete) operations on the documents in the "do" collection.


module.exports = Mongoose.model("toDoTask", toDoSchema, "do")