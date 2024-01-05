const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const catRoute = require("./routes/categories")
const fileUpload = require('express-fileupload');
const cors = require("cors")

app.use('/uploads', express.static('uploads'));
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true,

}));
app.get('/', (req, res) => {
  res.json('Meow')
});


mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connection successful")).catch((err) => {
  console.log(err);
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);



app.listen(5000, () => {
  console.log("Backend is running");
})