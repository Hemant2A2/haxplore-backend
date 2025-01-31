import UploadModel from "../models/upload.model";

export const saveFile = async (file: Express.Multer.File) => {
  const newFile = new UploadModel({
    filename: file.filename,
    path: file.path,
    mimetype: file.mimetype,
    size: file.size,
  });

  await newFile.save();
  return newFile;
};

export const fetchUploads = async () => {
  return await UploadModel.find();
};
