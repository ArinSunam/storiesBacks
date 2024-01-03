const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const catRoute = require("./routes/categories")
const multer = require("multer")
const cors = require("cors")

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.json('Meow')
});

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connection successful")).catch((err) => {
  console.log(err);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  }, fileName: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);



app.listen(5000, () => {
  console.log("Backend is running");
})