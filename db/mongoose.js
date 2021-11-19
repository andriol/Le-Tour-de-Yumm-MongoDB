const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    //autoIndex: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
