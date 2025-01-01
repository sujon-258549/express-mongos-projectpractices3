import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
// import multer from 'multer';
import fs from 'fs';

// // step 1 clude img congig and uplode formet copy
// // malter temfile create  roote>Uplodefile  multer cwd path file link
// // medel wate create router this img uplod route

// // Cloudinary Configuration
// cloudinary.config({
//   cloud_name: 'dkdibsanz',
//   api_key: '558721645753651',
//   api_secret: 'Ky5Ga3DuiaRU77goqQem_bEdWQU', // Replace with your actual API secret
// });

// // Function to Upload Image to Cloudinary
// export const sendImageCludinary = (path: string, imageName: string) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload(path, {
//         public_id: imageName,
//       })
//       .then((result) => {
//         // Delete the local file after successful upload
//         fs.unlink(path, (err) => {
//           if (err) {
//             console.error('Error deleting file:', err);
//           } else {
//             console.log('File deleted successfully.');
//           }
//         });
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + '/uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   },
// });

// export const upload = multer({ storage: storage });

export const sendImageCludinary = (
  path: string,
  name: string,
): Promise<Record<string, unknown>> => {
  //:Record<string, unknown>
  console.log({ path, name });
  cloudinary.config({
    cloud_name: config.CLUDE_NAME,
    api_key: config.CLUDE_API_KYE,
    api_secret: config.CLUDE_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  return new Promise((resolve, reject) => {
    const uploadResult = cloudinary.uploader
      .upload(path, {
        public_id: name,
      })

      .then((result) => {
        fs.unlinkSync(
          path,
          //     (err) => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     // The file was deleted successfully
          //     console.log('The file was deleted');
          //   }
        );
        // if (error) {
        //   reject(error);
        // }
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });

    console.log(uploadResult);
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

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     // console.log(file)
//     const fileExt = path.extname(file.originalname);
//     const filename =
//       file.originalname
//         .replace(fileExt, '')
//         .toLowerCase()
//         .split(' ')
//         .join('-') +
//       '-' +
//       Date.now();

//     cb(null, filename + fileExt);
//   },
// });

// export const upload = multer({ storage: storage });
