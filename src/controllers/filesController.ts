import { Request, Response } from 'express';
import {
  createUser,
  findUserByName,
  registerFilesToUser,
} from '../service/user.service';

export const uploadFiles = async (req: Request, res: Response) => {
  const userId = req?.body?.userName;
  if (!userId) return res.status(404).end('No user id found');
  await createUser(userId);
  if (!req?.files?.length) {
    return res.status(400).end('No files were sent');
  }
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
};

export const getFilesMetadata = async (req: Request, res: Response) => {
  const userName = req?.body?.userName;
  console.log(userName, req.body);

  if (!userName)
    return res.status(400).end('Queries must contain a userName parameter');
  const user = await findUserByName(userName);
  const metadata = user?.files ?? [];
  console.log('Metadata retrieved: ', metadata);
  return res.json(metadata);
};

export const downloadFiles = (req: Request, res: Response) => {
  res.end();
};
