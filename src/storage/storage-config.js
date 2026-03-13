import fs from "fs";
import path from "path";
import multer from "multer";
import ClientError from '../exceptions/client-error.js';

export const upload_cover = path.resolve(process.cwd(), 'src/storage/images');

if(!fs.existsSync(upload_cover)) {
    fs.mkdirSync(upload_cover, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, upload_cover),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const multerUpload = multer({
 storage,
 limits: {
 fileSize: 512000
 },
 fileFilter: (req, file, cb) => {
 if(file.mimetype && file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new ClientError('Only Image files are allowed'), false);
        }
 }
});

export default { upload_cover, storage, multerUpload }