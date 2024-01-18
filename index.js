const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./controllers/auth")
const userRoute = require("./controllers/users")
const catRoute = require("./controllers/categories")
const postRoutes = require('./routes/postRoutes')
const fileUpload = require('express-fileupload');
const cors = require("cors")
//apps
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

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connection successful")).catch((err) => {
  console.log(err);
});

app.use(postRoutes);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use("/api/categories", catRoute);



app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running");
})