import express from 'express';
import {
  downloadFiles,
  getFilesMetadata,
  uploadFiles,
} from '../controllers/filesController';

const router = express.Router();

router.post('/files', uploadFiles);

router.get('/files', getFilesMetadata);

router.get('/download', downloadFiles);

export default router;
