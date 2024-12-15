import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const memoryUpload = (request: Request, response: Response, next: NextFunction) => {
  try {
    upload.single('file')(request, response, (error) => {
      if (error) {
        return response.status(500).json(error);
      }
      if (!request.file) {
        return response.status(400).send('No loaded file.');
      }
      next();
    });
  } catch (error) {
    return response.status(500).json(error);
  }
};

export default memoryUpload;