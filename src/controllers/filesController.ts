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

export const downloadFiles = async (req: Request, res: Response) => {
  const userName = req?.body?.userName;
  const fileNameReq = req?.body?.fileName;
  if (!userName || !fileNameReq) {
    res.status(404).end('Bad request. Must have userId and fileName fields');
    return;
  }

  const user = await findUserByName(userName);
  if (!user) return res.status(404).end(`User doesn't exist`);
  if (!user.files) return res.status(404).end(`User doesn't have files`);

  const file = user.files.find(({ fileName, originalName }) => {
    return fileNameReq === fileName || fileNameReq === originalName;
  });
  if (!file) return res.status(404).end(`File doesn't exist`);

  res.download(`uploads/${userName}/${file.fileName}`, file.originalName);
};
