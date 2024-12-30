import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configuration
cloudinary.config({
  cloud_name: 'dkdibsanz',
  api_key: '558721645753651',
  api_secret: '<your_api_secret>', // Click 'View API Keys' above to copy your API secret
});

export const sendImageCludinary = (path: string, imageName: string) => {
  // Upload an image
  return new Promise((resolve, reject) => {
    const uploadResult = cloudinary.uploader
      .upload(path, {
        public_id: imageName,
      })
      .catch((error) => {
        reject(error);
      });

    resolve(uploadResult);
  });
};

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
