const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Authentication = require("./Route/Auth");
const users = require("./Route/user");
const Post = require("./Route/post");
const Categories = require("./Route/category");
const multer = require("multer");
dotenv.config();


app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,


}).then(console.log("Connected")).catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "image");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File  uploaded")
});
app.use("/api/auth", Authentication);
app.use("/api/user", users);
app.use("/api/post", Post);
app.use("/api/category", Categories)

app.listen("5000", () => {
    console.log("running")
});