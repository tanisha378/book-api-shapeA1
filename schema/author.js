const mongoose = require("mongoose")

//creatr a author schema
const AuthorSchema = mongoose.Schema({  
    id:{
        type: Number,
        required: true,
    }, 
    name: String,
    books: [String]
});

//crete author model
const AuthorModel = mongoose.model("author", AuthorSchema);

module.exports = AuthorModel;