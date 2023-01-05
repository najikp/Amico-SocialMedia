import express from "express";
const router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const videoStorage= multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
const videoUpload=multer({storage:videoStorage});



router.post('/',upload.single('file'),(req,res)=>{
    try {
        return res.status(200).json('File Uploaded Successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).json({messege:error})
    }
})

router.post('/video',videoUpload.single('file'),(req,res)=>{
  try {
    return res.status(200).json('Video Uploaded Successfully')
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error})
  }

})


export default router;