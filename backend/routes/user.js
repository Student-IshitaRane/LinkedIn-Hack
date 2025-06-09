import express from 'express';
import { upload, cloudinaryFile} from '../middleware/cloudinary.js';
// import { editProfile } from '../controller/userControllers.js';
import { viewProfile } from '../controller/userControllers.js';
const router = express.Router();


router.post('/upload-resume', upload, cloudinaryFile, (req, res) => {
  // At this point, req.body.resumeURL has the Cloudinary URL
  res.json({ message: 'Resume uploaded successfully!', url: req.body.resumeURL });
});

// router.put('/edit-profile/:emailid', editProfile);
router.get('/view-profile/:emailid', viewProfile);

export default router;
