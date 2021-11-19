const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const flash = require("connect-flash");

const passport = require("passport");
const User = require("./models/user");
const cakeRoutes = require("./routes/cakes");
const userRoutes = require("./routes/user");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();
require("./db/mongoose");
require("./middleware/passport")(passport);

const port = process.env.PORT || 8081;

const publicDirectoryPath = path.join(__dirname, "./public/");
const publicDirectory = path.join(__dirname, "./public/images");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
hbs.registerPartials(partialsPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
app.use(express.static(publicDirectory));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware

app.use(passport.initialize());
app.use(passport.session());

//Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/profile",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          user = new User({
            provider: "google",
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            google: profile._json,
          });
          console.log(user);
          user.save(function (err) {
            if (err) console.log(err);
            return cb(err, user);
          });
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.logout_msg = req.flash("logout_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/products", cakeRoutes);

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
