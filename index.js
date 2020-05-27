const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const homeRouted = require("./routes/home");
const addRouted = require("./routes/add");
const authRouted = require("./routes/auth");
const profileRouted = require("./routes/profile");
const cartRouted = require("./routes/cart");
const coursesRouted = require("./routes/courses");
const ordersRouted = require("./routes/orders");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const errorHandler = require("./middleware/error");
const fileMiddleware = require("./middleware/file");
const keys = require("./keys");

const app = express();
const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URI,
});

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: require("./utils/hbs-helpers"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(fileMiddleware.single("avatar"));
app.use(csrf());
app.use(flash());
app.use(helmet());
app.use(compression());
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRouted);
app.use("/add", addRouted);
app.use("/auth", authRouted);
app.use("/cart", cartRouted);
app.use("/courses", coursesRouted);
app.use("/orders", ordersRouted);
app.use("/profile", profileRouted);

app.use(errorHandler);

const PORT = process.env.PORT || 3002;

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
