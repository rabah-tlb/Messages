let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let session = require("express-session");

// Moteur de template
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "aaaa",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(require("./middlewares/flash"));

// Routes
app.get("/", (request, response) => {
  console.log(request.session);
  response.render("pages/index");
});

app.get("/about", (request, response) => {
  response.render("pages/about");
});

app.post("/", (request, response) => {
  if (request.body.message === undefined || request.body.message === "") {
    request.flash("error", "Vous n'avez pas posté de message");
  } else {
    let Message = require("./models/message");
    Message.create(request.body.message, function () {
      request.flash("success", "Merci !");
    });
  }
  response.redirect("/");
});

app.listen(8080);
