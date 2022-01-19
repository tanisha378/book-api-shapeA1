const Router = require("express").Router();
const PublicationModel = require("../schema/publication");
const BookModel = require("../schema/book")

// Route    - /publication
// Des      - To get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/publication", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});

/*
Route           /publication/new
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/publication/new", async(req, res) => {
    try{
        const {newPub} = req.body
        
        await PublicationModel.create(newPub);
        return res.json({ message: "Publication added to the database" }); 
  }catch(error){
    return res.json({ error: error.message });
  }
})

/*
Route               /publication/delete
Description         delete an publication
Access              PUBLIC
Parameters          id
Method              DELETE
*/
Router.delete("/publication/delete/:id", async (req, res) => {
    const { id } = req.params;

    const updatePublicationDatabase = await PublicationModel.findOneAndDelete({
       ID: id,
    });

    return res.json({ updatePublicationDatabase });
});


/*
Route               /publication/delete/book
Description         delete an book from a publication
Access              PUBLIC
Parameters          id, isbn
Method              DELETE
*/
Router.delete("/publication/delete/book/:isbn/:id", async(req, res) => {
    const { isbn, id } = req.params;
     //updating book database object
     const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn,
        },
        {
            $pull: {
                publication: parseInt(id),
            },
        },
        {
            new: true,
        }
    );

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: parseInt(id),
        },
        {
            $pull: {
                books: isbn,
            },
        },
        {
            new: true,
        }
    );

    return res.json({
        message: "Book was deleted",
        book: updatedPublication,
        author: updatedBook,
    });
});

module.exports = Router;