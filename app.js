/*
 Authors:
 Clinton Kai Hin, Wong - A01252643
 Rodolf John Gayem - A01157958
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body;
  let movies = formData.movie_list.split(",");
  res.render("pages/index", { movie_list: movies })
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});