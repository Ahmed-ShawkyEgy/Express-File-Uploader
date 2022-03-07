import express from 'express';
import {
  downloadFiles,
  getFilesMetadata,
  uploadFiles,
} from '../controllers/filesController';
import multerMulti from '../middlewares/multer';

const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: The files managing API
 */

/**
 * @swagger
 * /api/files:
 *   post:
 *     tags: [Files]
 *     summary: Uploads one or more files related to a user
 *     requestBody:
 *          content:
 *           multipart/form-data:
 *             schema:
 *              type: object
 *              properties:
 *               userName:
 *                 type: string
 *                 required: false
 *               randomFiles:
 *                 required: true
 *                 type: array
 *                 items:
 *                  type: string
 *                  format: binary
 *     responses:
 *      '200':
 *        description: File(s) uploaded successfully
 *        content:
 *          'text/html':
 *            type: string
 *      '404':
 *        description: Missing 'userName' field
 *      '400':
 *        description: No file(s) found
 */
router.post('/files', multerMulti.array('randomFiles'), uploadFiles);

/**
 * @swagger
 * /api/files/{userId}:
 *  get:
 *   tags: [Files]
 *   summary: Returns the metadata of all of the user's files
 *   parameters:
 *    - name: 'userId'
 *      in: 'path'
 *      schema:
 *       type: string
 *       required: true
 *   responses:
 *    '200':
 *      description: Metadata fetched
 *    '400':
 *      description: Missing 'userName' field
 * */
router.get('/files/:userId', getFilesMetadata);

/**
 * @swagger
 * /api/download:
 *  get:
 *   tags: [Files]
 *   summary: Downloads the requested file
 *   description: the 'fileName' parameter should either match the original file's name or the file's name in the local disk
 *   parameters:
 *    - name: 'userName'
 *      in: 'query'
 *      schema:
 *       type: string
 *       required: true
 *    - name: 'fileName'
 *      in: 'query'
 *      schema:
 *       type: string
 *       required: true
 *   responses:
 *    '200':
 *      description: Metadata fetched
 *    '400':
 *      description: Bad request. Must have userId and fileName fields
 *    '404':
 *      description: Either user doesn't exist, or they have no files to their account
 * */
router.get('/download', downloadFiles);

export default router;
