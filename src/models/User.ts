import { Schema, model } from 'mongoose';

interface User {
  name: string;
  files: {
    fileName: string;
    originalName: string;
    fileSize: number;
    path: string;
    uploadTimestamp: number;
  }[];
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  files: {
    type: [
      {
        fileName: String,
        originalName: String,
        fileSize: Number,
        path: String,
        uploadTimestamp: Number,
      },
    ],
    default: [],
  },
});

const userModel = model<User>('User', schema);

export default userModel;
