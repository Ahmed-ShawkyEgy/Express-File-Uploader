import express from 'express';
import {
  downloadFiles,
  getFilesMetadata,
  uploadFiles,
} from '../controllers/filesController';
import multerMulti from '../middlewares/multer';

const router = express.Router();

router.post('/files', multerMulti.array('randomFiles'), uploadFiles);

router.get('/files', getFilesMetadata);

router.get('/download', downloadFiles);

export default router;
