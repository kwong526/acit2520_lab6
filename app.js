/*
 Authors:
 Clinton Kai Hin, Wong - A01252643
 Rodolf John Gayem - A01157958
 (Make sure you also specify on the Google Doc)
*/
const fs = require("fs").promises;
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) =>
    res.render("pages/index", {
        movie_list: ["Transformers", "Gladiator", "Harry Potter"],
    })
);

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
    let formData = req.body;
    let movies = formData.movie_list.split(",");
    res.render("pages/index", { movie_list: movies });
});

app.get("/myListQueryString", (req, res) => {
    let movie1 = req.query.movie1;
    let movie2 = req.query.movie2;
    if (movie1 === undefined || movie2 === undefined) {
        res.send("<p>Please add a movie1 and movie2 to your query string!</p>");
    }
    let movieList = [movie1, movie2];
    res.render("pages/index", { movie_list: movieList });
});

app.get("/search/:movieName", async(req, res) => {
    let movieName = req.params.movieName;
    const content = await fs.readFile("movieDescriptions.txt");

    if (content.includes(movieName)) {
        let data = content.toString();
        let new_content = data.split(":");
        res.render("pages/searchResult", { description: new_content });
    } else {
        res.send("<p>Movie could not be found</p>");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀");
});