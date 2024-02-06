const express = require("express");
const app = express(); // starts the express
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");


/*By default the name of the template file will be views so 
instead of that we want the file name to be template */
const templatePath = path.join(__dirname, '../templates');
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); //to get hbs and mongodb files connected
app.set("view engine", "hbs");
app.set("views", templatePath); //to change the name of the file
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

/*//(async=>meaning it can perform tasks concurrently without
 blocking the execution of the rest of the program.) */
app.post("/signup", async (req, res) => {
    console.log("Received a POST request to /signup");
// Handle signup logic here, e.g., insert data into MongoD
    const data = {
        name: req.body.name,  
        password: req.body.password
    };
//fills the data in mongodb
    await collection.insertMany([data]);
/* working with mongodb we need to use async and await functions. 
It allows you to write code that appears synchronous while still taking
 advantage of the asynchronous nature of certain tasks */
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
    // Redirect to the home page
    res.render("home");
});

app.listen(3000, () => {
    console.log("Port Connected");
});
