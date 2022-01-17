const mongoose = require("mongoose");

//create publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//create publication module

const PublicationModel = mongoose.model("publication", PublicationSchema);

module.exports = PublicationModel;
