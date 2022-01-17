require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

//API
const Book = require("./API/book");
const Author = require("./API/author");
const Publication = require("./API/publication");


mongoose.connect(process.env.MONGO_URI);
mongoose.connect("mongodb+srv://tanisha_25:tanisha_25@bookapi.3qhxn.mongodb.net/Bookapi?retryWrites=true&w=majority", {

  useNewUrlParser: "true",
  useUnifiedTopology: "true"

})
    .then(() => console.log("connection extablished!"))
    .catch((err) => {
        console.log(err);
    });
// initialization

const OurAPP = express();

OurAPP.use(express.json());

//microservices
OurAPP.use("/book", Book);
OurAPP.use("/author", Author);
OurAPP.use("/publication", Publication);


OurAPP.get("/", (request, response) => {
    response.json({ message: "Server is working!!!!!!" });
});




OurAPP.listen(8000, ()=> console.log("Server is running"))
