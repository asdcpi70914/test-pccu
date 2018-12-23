"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const line_login = require("line-login");
const session = require("express-session");
const session_options = {
    secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    resave: false,
    saveUninitialized: false
}
app.use(session(session_options));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");
app.get("/login", (req, res) => {
    res.render("login");
})
const login = new line_login({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback_url: process.env.LINE_LOGIN_CALLBACK_URL
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening to ${process.env.PORT || 5000}...`);
});


app.get("/auth", login.auth());


app.get("/form1",login.callback(
    (req, res, next, token_response) => {

        res.json(token_response);
        console.log(token_response)
        console.log(token_response.id_token.sub)
    },(req, res, next, error) => {

        res.status(400).json(error);
    }
));