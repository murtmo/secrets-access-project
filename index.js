//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const correctPassword = "ILoveProgramming";

var userIsAuthorised = false;

function checkPassword(req, res, next) {
  var inputedPass = req.body.password;
  console.log(inputedPass);
  if(correctPassword === inputedPass) {
    userIsAuthorised = true;
  } else {
    userIsAuthorised = false;
  }
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(checkPassword);

app.post("/check", (req, res, next) => {
  if(userIsAuthorised) {
    console.log("correct!");
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    console.log("incorrect...");
    res.redirect("/");
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});