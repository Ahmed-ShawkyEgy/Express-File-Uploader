import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  // Destination goes to /uploads/${userId}
  destination: (req, file, cb) => {
    const userId = req?.body?.userName;
    if (!userId) return cb(new Error('No user id found'), 'uploads');
    const loc = `uploads/${userId}`;
    fs.mkdir(path.resolve(loc), (err) => {
      if (err && err?.code !== 'EEXIST') cb(err, '');
      else cb(null, loc);
    });
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, timestamp + ext);
  },
});

const upload = multer({ storage });

export default upload;
