//how to make a middleware
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");//use only one dot in the path 
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});