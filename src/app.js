require('dotenv').config();

const connectFirebase = require('connect-session-firebase');
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const express = require("express");
const path = require("path");

const database = require("./firebase.js");
require("./strategy.js");

const app = express();

// Port
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));

const authRoute = require("./routes/google");
const profileRoute = require("./routes/perfil");
const shoppingcartRoute = require("./routes/carrinho");

const FirebaseStore = connectFirebase(session);
const store = new FirebaseStore({
    database: database.firebase.database(),
    sessions: 'sessions'
});

app.use(
    session({
        secret: "some random secret",
        cookie: {
            maxAge: 172800000,
        },
        saveUninitialized: false,
        resave: false,
        name: "google.oauth2",
        store: store,
    })
);

app.use((req, res, next) => {
    if (req.path.endsWith("/") && req.path.length > 1) {
        const newPath = req.path.slice(0, -1);
        const query = req.url.slice(req.path.length);
        res.redirect(301, newPath + query);
    } else {
        next();
    }
});

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "global")));

// Middleware Routes
app.use("/google", authRoute);
app.use("/perfil", profileRoute);
app.use("/carrinho", shoppingcartRoute);

app.get("/", async (req, res) => {
    let user = req.user || undefined;
    res.render("index", {
        items: await database.database.get("items"),
        user,
    });
});

app.get("/adm", async (req, res) => {
    res.render("adm");
});

app.post("/admin", async (req, res) => {
    if (req.body.senha === process.env.PASSWORD) {
        res.render("admin.ejs", {
            pedidos: await database.database.get("adm"),
        });
    } else {
        res.send("Senha incorreta");
    }
});

app.get("*", (req, res) => {
    res.render("error", { url: req.url });
});

// Listen
app.listen(port, () => {
    console.log(`Conectado a porta: ${port}!`);
});
