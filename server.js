require("dotenv").config()
const express = require('express');
const app = express();
const PORT = 3000;
const methodOverride = require("method-override")
const pokemons = require("./models/pokemon")

// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use("/static", express.static("public"))

// Index Route
app.get("/pokemon", (req, res) =>{
    res.render("index.ejs", {
        pokemon: pokemons
    })
})



app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})