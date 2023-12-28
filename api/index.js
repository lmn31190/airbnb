//PACKAGES
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import "dotenv/config";

//MODELS
import Place from "./models/Place.js";

//Route
import authRoute from "./routes/auth.js";


const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", authRoute);

mongoose.connect(process.env.MONGO_URL);



//Upload web Images
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName)
});

//Upload local Images

const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ''));
  }
  res.json(uploadedFiles);
})

app.post('/places', (req, res) => {

})

// SERVER RUN
app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});

// AZehLElmfOsSm8kK
