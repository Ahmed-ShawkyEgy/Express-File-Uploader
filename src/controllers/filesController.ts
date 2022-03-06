import { Request, Response } from 'express';
import { findOrCreateUser, registerFilesToUser } from '../service/user.service';

export const uploadFiles = (req: Request, res: Response) => {
  const userId = req?.body?.userName;
  if (!userId) return res.status(404).end('No user id found');
  findOrCreateUser(userId).then(() => {
    const files = (req?.files as any)?.map(
      ({ originalname, filename, size }) => ({
        originalName: originalname,
        fileName: filename,
        fileSize: size,
        uploadTimestamp: +new Date(),
      })
    );

    registerFilesToUser(userId, files);
    console.log('File(s) uploaded successfully');
    return res.end('File Uploaded Successfully');
  });
};

export const getFilesMetadata = (req: Request, res: Response) => {
  res.end();
};

export const downloadFiles = (req: Request, res: Response) => {
  res.end();
};
