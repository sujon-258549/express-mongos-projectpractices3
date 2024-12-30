import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';

// step 1 clude img congig and uplode formet copy
// malter temfile create  roote>Uplodefile  multer cwd path file link
// medel wate create router this img uplod route

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dkdibsanz',
  api_key: '558721645753651',
  api_secret: '<your_api_secret>', // Replace with your actual API secret
});

// Function to Upload Image to Cloudinary
export const sendImageCludinary = (path: string, imageName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(path, {
        public_id: imageName,
      })
      .then((result) => {
        // Delete the local file after successful upload
        fs.unlink(path, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted successfully.');
          }
        });
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
