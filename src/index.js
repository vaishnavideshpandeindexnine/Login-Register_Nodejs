const express = require("express");
const app = express(); // starts the express
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


app.post("/signup", async (req, res) => {
    console.log("Received a POST request to /signup");

    const data = {
        name: req.body.name,
        password: req.body.password
    };

    await collection.insertMany([data]);

    res.redirect("/home");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.render("home");
        } else {
            console.log("Authentication failed:", check);
            res.send("Wrong username or password!");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.send("Error during login");
    }
});


app.get("/home", (req, res) => {
    // Handle rendering of the home page
    res.render("home");
});

app.listen(3000, () => {
    console.log("Port Connected");
});
