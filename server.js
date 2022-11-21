require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const methodOverride = require("method-override");
const pokemons = require("./models/pokemon");// import Pokemons data

// Middleware
app.use(express.urlencoded({extended: true}));// parse data from form submissions into req.body
app.use(express.json());
app.use(methodOverride("_method"));
app.use("/static", express.static("public"));

// Home Route
app.get('/', (req, res) => res.redirect("/pokemon"));

// Index Route
app.get("/pokemon", (req, res) =>{
    res.render("index.ejs", {
        pokemon: pokemons
    })
});

// New route - new.ejs

app.get("/pokemon/new", (req, res) =>{
    res.render("new.ejs")
});


// Create Route
app.post("/pokemon", (req, res) => {

    // pushes the added pokemon to the index
   pokemons.unshift(req.body)

    //res.json(req.body)
    
    // redirect to main page
    res.redirect("/pokemon")

});

// Delete Route
app.delete("/pokemon/:id", (req, res) => {
    // splice - deletes the item from the array
    pokemons.splice(req.params.id, 1)
    // redirect use to index page
    res.redirect("/pokemon")
})



// Show Route
app.get("/pokemon/:id", (req, res) =>{
    //console.log("show",pokemons[req.params.id])
    res.render("show.ejs", {
        pokemon: pokemons[req.params.id],
         index: req.params.id

    })
});



// Port
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})